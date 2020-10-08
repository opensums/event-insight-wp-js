const settings = {};

/**
 * Handle a response error.
 *
 * A standard response error
 */
function errorDialog(error) {
  let errorMessage;
  const { code, response, message } = error;
  if (response.codes) {
    errorMessage = response.code;
  } else if (response.message) {
    errorMessage = response.message;
  } else {
    errorMessage = `Error ${code} ${message}`;
  }

  settings
    .jquery('<div></div>')
    .html(errorMessage)
    .dialog({
      title: `Error ${code} ${message}`,
      xresizable: false,
      modal: true,
      xbuttons: {
        OK: () => {
          settings.jquery(this).dialog('close');
        },
      },
    });
}

export { errorDialog };
