import * as path from 'path';
import { window, workspace, commands } from 'vscode';
import { LanguageClient, ClientOptions, ClientStarter } from 'vscode-languageclient';

export function activate() {

	// We need to go one level up since an extension compile the js code into
	// the output folder.
	let module = path.join(__dirname, '..', 'server', 'server.js');
	let debugOptions = { execArgv: ["--nolazy", "--debug=6004"] };
	let clientOptions: ClientOptions = {
		server: {
			run: { module },
			debug: { module, options: debugOptions}
		},
		syncTextDocument: (textDocument) => (textDocument.languageId === 'typescript' || textDocument.languageId === 'typescriptreact'),
		configuration: 'tslint',
		fileWatchers: workspace.createFileSystemWatcher('**/tslint.json')
	}

	let client = new LanguageClient('TS Linter', clientOptions);
	new ClientStarter(client).watchSetting('tslint.enable');
}