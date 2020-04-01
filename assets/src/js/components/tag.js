import React from 'react';

export const Tag = (props) => <button className="button is-danger is-small is-rounded" onClick={ (e) => props.deleteTag(e, props.tag) }> <span className="icon"><i className="mdi mdi-close-circle" /></span><span><b>{props.tag}</b></span> </button>;

export default Tag;
