import React from 'react';

import './JSONViewer.css';

interface JSONViewerProps {
	allowsID: boolean;
	data: any;
	itemClicked: Function;
}

const JSONViewer: React.FC<JSONViewerProps> = ({ allowsID, data, itemClicked }: JSONViewerProps) => {
	if (Array.isArray(data) && allowsID) {
		return (
			<div className="data">
				<pre className="bracket">[</pre>
				{
					data.map(
						line => <pre key={line.id} className="item" onClick={() => itemClicked(line.id)}>{JSON.stringify(line, null, '  ')}{line === data[data.length-1] ? '' : ','}</pre>
					)
				}
				<pre className="bracket">]</pre>
			</div>
		)
	}
	return <pre className="data">{JSON.stringify(data, null, '  ')}</pre>
}

export default JSONViewer;
