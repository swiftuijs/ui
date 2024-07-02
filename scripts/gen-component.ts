// plopfile.ts
import type { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
 // controller generator
	plop.setGenerator('component', {
		description: 'generate a new component',
		prompts: [{
			type: 'input',
			name: 'name',
			message: 'Component name please, in PascalCase:'
		}],
		actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'template/index.tsx.hbs'
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/style.scss',
        templateFile: 'template/style.scss.hbs'
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/{{ lowerCase name }}.stories.tsx',
        templateFile: 'template/stories.tsx.hbs'
      },
      {
        type: 'append',
        path: '../src/components/index.ts',
        template: 'export * from \'./{{pascalCase name}}\';'
      }
    ]
	});
}
