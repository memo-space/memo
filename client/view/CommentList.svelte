<script>
  import { onMount } from "svelte";
  import { options } from "../lib/stores";
  import Comment from "./Comment.svelte";
  import { Get } from "../lib/GetResponse";
  let M = $options;
  let current = 0;
  let max = 0;
  let fail = false;
  let list = $state([]);
  let isLoad = $state(false);
  
  onMount(() => {
    GetComment();
  });

  async function GetComment() {
    isLoad = true;
    console.log(`${M.url}comment/${current}/5?p=${M.path}`)
    const { ok, data, message, max } = await Get(
      // @ts-ignore
      `${M.url}comment/${current}/5?p=${M.path}`,
    );
    if (!ok) fail = true;
    list = [...data, ...list];

    console.log("commentlist:", list);
  }
  async function more() {
    current++;
    GetComment();
  }
</script>

<div class="m-cards">
  <Comment {list} />
  <button onclick={more}>more</button>
</div>
