<script>
  import { Format } from "../lib/format-time";
  import Submit from "./Submit.svelte";
  let pid = $state();
  let { list } = $props();
  function onReply(id) {
    pid = id;
  }
</script>

{#each list as comment}
  <div class="m-card">
    <div class="m-head">
      <div class="m-info">
        <div class="m-nick">
          {#if comment.site}
            <a href={comment.site}>{comment.name}</a>
          {:else}
            {comment.name}
          {/if}
        </div>
        <time class="m-meta" datetime={new Date(comment.date).toString()}>
          {Format(comment.date)}
        </time>
      </div>
      <button
        class="m-reply"
        onclick={() => {
          return onReply(comment._id);
        }}>回复</button
      >
    </div>
    <div class="m-comment">
      {comment.body}
      {#if pid === comment._id}
        <Submit {pid} />
      {/if}
    </div>
  </div>
{/each}
