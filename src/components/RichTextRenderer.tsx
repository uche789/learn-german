import React from 'react';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';

export default function RichTextRenderer({ richTextDocument }: {richTextDocument: Document }) {
  // Custom render options for handling different Contentful Rich Text types
  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-xl font-semibold my-4">{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-lg font-semibold my-4">{children}</h3>,
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="my-4">{children}</p>,
      [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc pl-5">{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal pl-5">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title } = node.data.target.fields || {};
        return file ? <img src={file.url} alt={title || 'Embedded asset'} /> : null;
      },
      [INLINES.HYPERLINK]: (node, children) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
      // Handle tables
      [BLOCKS.TABLE]: (node, children) => (
        <table className="min-w-full border-collapse border border-gray-300">
          <tbody>
            {children}
          </tbody>
        </table>
      ),
      [BLOCKS.TABLE_ROW]: (node, children) => (
        <tr className="border border-gray-300">{children}</tr>
      ),
      [BLOCKS.TABLE_CELL]: (node, children) => (
        <td className="border border-gray-300 p-2">{children}</td>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
        <th className="border border-gray-300 p-2">{children}</th>
      ),
    },
  };

  return <div>{documentToReactComponents(richTextDocument, options)}</div>;
}
