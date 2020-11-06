<script>
  import { getContext } from "svelte";
  import Modal from "../Modal.svelte";

  let context = getContext("global");
  let selected = context.multistep;
  let selectedAccount = context.selectedAccount;

  context.multistep.subscribe((n) => (selected = n));
 
</script>

<Modal index={2} on:close {selected}>
    <div slot="header" class="flex flex-wrap " >
      <span class="text-xs text-gray-700 truncate">{$selectedAccount.address}</span>
      <span class="text-xs text-blue-500"
      on:click={() => {
        context.selectedAccount.set(null);
        context.multistep.previousStep();
      }}>Change account</span>
    </div>
    

    
     
  
</Modal>
