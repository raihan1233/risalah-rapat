<script>
  import MultiSelect from 'svelte-multiselect'

  const users = [`User 1`, `User 2`, `User 3`, `User 4`, `User 5`]

  const filter_func = (op, searchText) => {
    if (!searchText)
        return true;
    const [label, lang, searchStr] = [op.label, op.lang, searchText].map((s) => s.toLowerCase());
    return label.includes(searchStr) || lang.includes(searchStr);
  };
</script>

<MultiSelect 
  options={users} 
  id="confetti-select"
  maxSelect={2}
  placeholder="Pilih 2 user"
  filterFunc={filter_func} 
  />