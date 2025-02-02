// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const normalizeDefaultValue = (defaultValue: string, type: string) => {
  if (type === 'string') {
    return `"${defaultValue}"`;
  }
  return defaultValue;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "usestate" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.useState',
    async () => {
      const input = await vscode.window.showInputBox({
        placeHolder: 'Variable name[ DefaultValue [Type]]',
      }) || '';
      const [variableName = '', defaultValue = '', ...rest] = input.split(' ');
      const type = rest.join(' ').trim();

      if (variableName) {
        const capitalized = [
          variableName[0].toUpperCase(),
          variableName.slice(1),
        ].join('');
        let useStateLine = `const [${variableName}, set${capitalized}] = useState`;
        useStateLine += type ? `<${type}>` : '';
        useStateLine += `(${normalizeDefaultValue(defaultValue, type)});`;
  
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          const start = editor.selection.start;
          editor.edit(builder => builder.insert(start, useStateLine));
        }
      }
    },
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
