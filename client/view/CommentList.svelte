<script>
  import { onMount } from "svelte";
  import { options } from "../lib/stores";
  import request from "../lib/request";
  import Comment from "./Comment.svelte";
  let M = $options;
  let item = [];
  let list = [];

  onMount(() => {
    GetComment();
  });
  $: {
    list = [...item, ...list];
  }

  async function GetComment() {
    const { ok, data, message } = await request({
      // @ts-ignore
      url: `${M.url}/comment/0/5?p=${M.path}`,
    });
    if (!ok) throw new Error(message);
    list = [...data, ...list];
    console.log(list);
    
  }
</script>

<div class="m-cards">
  <Comment {list} />
</div>
