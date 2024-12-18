<script>
  import List from "./view/list.svelte";
  let repid=$state('456')
</script>


<List {repid} onreply={(id)=>{
  repid=id
  console.log(repid);
  
}}/>