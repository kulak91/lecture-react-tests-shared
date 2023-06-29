class Loader {
  get Element_Container(): ReturnType<typeof $> {
    return $('[data-test-id="loader"]');
  }
}

export { Loader };
