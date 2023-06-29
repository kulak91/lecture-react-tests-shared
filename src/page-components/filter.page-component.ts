class Filter {
  get SearchBar_Field(): ReturnType<typeof $> {
    return $('[data-test-id="filter-search"]');
  }

  get Duration_Dropdown(): ReturnType<typeof $> {
    return $('[data-test-id="filter-duration"]');
  }

  get Level_Dropdown(): ReturnType<typeof $> {
    return $('[data-test-id="filter-level"]');
  }
}

export { Filter };
