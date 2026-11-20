import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt();

type ContentRecord = {
	pageContent?: string | null;
	markdownContent?: string | null;
	Projects?: ContentRecord[];
};

export const renderPageContent = <T extends ContentRecord>(record: T) => {
	if (Object.prototype.hasOwnProperty.call(record, 'pageContent')) {
		const source = record.markdownContent;
		record.pageContent = source == null ? null : markdown.render(source);
	}
	record.Projects?.forEach(renderPageContent);
	return record;
};
