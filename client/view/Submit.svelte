<script>
  import { onMount } from "svelte";
  import request from "../lib/request";
  import { options } from "../lib/stores";
  let storage = {};
  let { cancel = false, pid = "", rid = "" } = $props();
  const M = $options;
  const textStr = "text";
  const nickStr = "name";
  const mailStr = "email";
  const siteStr = "site";
  const contentStr = "content";
  const contentLimit = 100;
  const mailReg = /^\w+([-.]\w+)*@\w+([-.]\w+)*(\.[a-z]{2,8})+$/;
  const siteReg = /^(https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,6})+)/;
  let localSave = $state(true);
  onMount(() => {
    if (localStorage.getItem("Memo_Form")) {
      console.log(123);

      initInto();
      metaChange();
    } else {
      localSave = false;
    }
  });
  $effect(() => {
    onInput();
  });
  const inputs = [
    {
      name: nickStr,
      placeholder: "nick* ( 2-8 )",
      type: textStr,
    },
    {
      name: mailStr,
      placeholder: "email* ( @ )",
      type: mailStr,
    },
    {
      name: siteStr,
      placeholder: "site ( https? )",
      type: siteStr,
    },
  ];

  let metas = $state({
    name: { value: "", is: false, limit: 8 },
    email: { value: "", is: false },
    site: { value: "", is: true },
    content: { value: "", is: false },
  });

  function metaChange() {
    const { name, email, site, content } = metas;
    const len = (param) => {
      return param.value.length;
    };

    if (len(name) > 1 && len(name) < name.limit) {
      name.is = true;
    } else {
      name.is = false;
    }

    if (len(email) > 1 && mailReg.test(email.value)) {
      email.is = true;
    } else {
      email.is = false;
    }

    if (len(site) === 0 || (len(site) > 1 && siteReg.test(site.value))) {
      site.is = true;
    } else {
      site.is = false;
    }

    if (len(content) > 2 && len(content) <= contentLimit) {
      content.is = true;
    } else {
      content.is = false;
    }
    for (const key in metas) {
      console.log(key,metas[key].is);
    }
    console.log("------");
    
  }
  function saveInfo() {
    for (const [k, v] of Object.entries(metas)) {
      storage[k] = v.value.trim();
    }
    localStorage.Memo_Form = JSON.stringify(storage);
  }
  function initInto() {
    try {
      storage = JSON.parse(localStorage.getItem("Memo_Form")) || {};
      for (const [k, v] of Object.entries(storage)) {
        metas[k].value = v || "";
      }
    } catch (error) {
      storage = {};
    }
  }
  function onInput() {
    saveInfo();
    metaChange();
  }
  async function onSend() {
    console.log(pid);

    const data = {
      // @ts-ignore
      url: `${M.url}/comment`,
      method: "POST",
      data: {
        // @ts-ignore
        path: M.path,
        name: metas.name.value,
        email: metas.email.value,
        site: metas.site.value,
        body: metas.content.value,
        rid,
        pid,
      },
    };

    const result = await request(data);
    console.log(result);
  }
  function onCancel() {
    cancel = false;
  }
</script>

<div class="m-submit">
  <div class="m-input">
    {#each inputs as ele}
      <input
        type={ele.type}
        class="m-{ele.name}"
        class:m-error={!metas[ele.name].is}
        oninput={onInput}
        bind:value={metas[ele.name].value}
        placeholder={ele.placeholder}
      />
    {/each}
  </div>
  <div class="m-content" class:m-error={!metas[contentStr].is}>
    <textarea
      spellcheck="false"
      name={contentStr}
      rows="5"
      bind:value={metas.content.value}
      oninput={onInput}
      placeholder="Currently does not support markdown. ♥️ "
    ></textarea>

    <div class="m-state">
      <span class="m-word">{metas.content.value.length}</span>
      <span class="m-limit">{contentLimit}</span>
    </div>
  </div>

  <div class="m-tool">
    <input type="checkbox" bind:checked={localSave} />
    <button class="m-btn" onclick={onCancel}>cancel</button>
    <button class="m-send m-btn" onclick={onSend}>Submit</button>
  </div>
</div>
