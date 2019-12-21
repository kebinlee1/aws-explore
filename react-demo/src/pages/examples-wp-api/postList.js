import React from "react";
import ContentList from './Content-list'
import conf from '../conf'

const pages = (props) => (
  <ContentList contentType={props.contentType} siteUrl={conf.siteUrl} />
)

export default pages;