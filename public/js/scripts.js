
/**
 * Fetches data from the api (server)
 */
function getFiles() {

}

/**
 * Render a list of files
 */
function renderFiles(files) {

}

/**
 * Fetch files from the API and render to the page: tie getFiles and renderFiles together
 */
function refreshFileList() {
  getFiles()
    .then(files => {
      const html = renderFiles(files);
    });

}
