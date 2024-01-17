import { Extensions } from "@tiptap/core";
import { ItalicExtension } from "./marks/italic";
import { BoldExtension } from "./marks/bold";
import { UnderlineExtension } from "./marks/underline";
import { StrikeExtension } from "./marks/strike";

export const eddiesDefaultExtensions: Extensions = [
  ItalicExtension,
  BoldExtension,
  UnderlineExtension,
  StrikeExtension,
];
