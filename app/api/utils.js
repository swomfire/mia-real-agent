import { Modifier, EditorState } from 'draft-js';

export const handleError = (error) => {
  const { response, request, message } = error;
  if (response) {
    const { data, status } = response;
    // Request made and server responded
    return { error: `[${status}] ${data}`, data };
  }
  if (request) {
    // The request was made but no response was received
    return { error: request };
  }
  // Something happened in setting up the request that triggered an Error
  return { error: message };
};

/**
 * https://github.com/jpuri/draftjs-utils/blob/master/js/block.js#L185
 * Function will clear all content from the editor.
 */
export const clearEditorContent = (editorState) => {
  const blocks = editorState
    .getCurrentContent()
    .getBlockMap()
    .toList();
  const updatedSelection = editorState.getSelection().merge({
    anchorKey: blocks.first().get('key'),
    anchorOffset: 0,
    focusKey: blocks.last().get('key'),
    focusOffset: blocks.last().getLength(),
  });
  const newContentState = Modifier.removeRange(
    editorState.getCurrentContent(),
    updatedSelection,
    'forward'
  );
  return EditorState.push(editorState, newContentState, 'remove-range');
};
