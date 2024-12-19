<script>
  import CommentList from "./view/CommentList.svelte";
  import Submit from "./view/Submit.svelte";
  import { replying } from "./lib/reping.svelte";
</script>

<div id="щ">
  <h2 class="m-title">文章评论</h2>
  <CommentList></CommentList>
  {#if !replying.repid}
  <h2 class="m-title">发表评论</h2>
  <Submit />
  {/if}
</div>

<style>
</style>