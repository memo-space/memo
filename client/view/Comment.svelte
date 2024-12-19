<svelte:options />

<script>
  import Self from "./Comment.svelte";
  import { Format } from "../lib/format-time";
  import Submit from "./Submit.svelte";
  import { replying } from "../lib/reping.svelte";
  let {
    list,
    onReply = (CommentID, ReplyID) => {
      replying.pid = ReplyID || CommentID;
      replying.rid = ReplyID ? CommentID : "";
      replying.repid = CommentID || ReplyID;
    },
  } = $props();
</script>

{#each list as comment}
  <div class="m-card">
    <div class="m-head">
      <div class="m-info">
        <div class="m-nick">
          {#if comment.site}
            <a href={comment.site}>{comment.name}</a>
          {/if}
          {comment.name}
        </div>
        <time class="m-meta" datetime={new Date(comment.date).toString()}>
          {Format(comment.date)}
        </time>
      </div>
      <button
        class="m-reply"
        onclick={() => {
          onReply(comment._id, comment.pid);
        }}>回复</button
      >
    </div>
    <div class="m-comment">
      <div class="m-body">
        {#if comment.at}<span class="m-at">{comment.at}</span>{/if}
        {comment.body}
      </div>
      {#if replying.repid === comment._id}
        <Submit at={comment.name} />
      {/if}

      {#if comment.reply && comment.reply.length}
        <Self list={comment.reply} />
      {/if}
    </div>
  </div>
{/each}
