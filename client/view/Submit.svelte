<script>
  import request from "../lib/request";
  import { options } from "../lib/stores";
  let M = $options;

  const textStr = "text";
  const nickStr = "name";
  const mailStr = "email";
  const siteStr = "site";
  const contentStr = "content";
  const contentLimit = 10;
  const mailReg = /^\w+([-.]\w+)*@\w+([-.]\w+)*(\.[a-z]{2,8})+$/;
  const siteReg = /^(https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,6})+)/;
  let textareaDOM;
  let isSend = false;
  let isLegal = false;
  const inputs = [
    {
      name: nickStr,
      placeholder: "名称*",
      type: textStr,
    },
    {
      name: mailStr,
      placeholder: "电子邮箱*",
      type: mailStr,
    },
    {
      name: siteStr,
      placeholder: "网址",
      type: siteStr,
    },
  ];

  let metas = {
    name: { value: "", is: false, limit: 2, required: true },
    email: { value: "", is: false, limit: 20, required: true },
    site: { value: "", is: true, limit: 20, required: false, reg: siteReg },
    content: { value: "", is: false, limit: contentLimit, required: true },
  };

  function onInput() {
    for (const key in metas) {
      const { value, required, reg } = metas[key];
      const length=value.length
      if(required && length){
        
      }
    }
  }

  async function onSend() {}
</script>

<div class="m-submit">
  <div class="m-input">
    {#each inputs as ele}
      <input
        class="m-{ele.name} {metas[ele.name].is ? '' : 'm-error'}"
        type={ele.name}
        placeholder={ele.placeholder}
        bind:value={metas[ele.name].value}
        on:input={onInput}
      />
    {/each}
  </div>
  <div class="m-content">
    <textarea
      class=" {metas[contentStr].is ? '' : 'm-error'}"
      name={contentStr}
      bind:value={metas.content.value}
      bind:this={textareaDOM}
      rows="5"
      placeholder="考虑到白嫖的数据库容量有限，暂不支持markdown。"
      on:input={onInput}
    ></textarea>
    <div
      class="m-state {metas[contentStr].value.length > contentLimit
        ? 'm-error'
        : ''}"
    >
      <span class="m-word">{metas.content.value.length}</span>
      <span class="m-limit">{contentLimit}</span>
    </div>
  </div>
  <div class="m-tool">
    <button class="m-send m-btn" on:click={onSend}>发送</button>
  </div>
</div>
