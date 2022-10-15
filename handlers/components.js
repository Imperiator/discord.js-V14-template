const { readdirSync } = require('fs');

module.exports =  (client) => {
	const componentFolder = readdirSync('./components');
	for (const folder of componentFolder) {
		const componentFiles = readdirSync(`./components/${folder}`).filter(
			(file) => file.endsWith('.js')
		);

		switch (folder) {
			case 'buttons':
				for (const file of componentFiles) {
					const component = require(`../components/${folder}/${file}`);
					client.buttons.set(component.data.name, component);
				}
				break;

			case 'selectMenu':
				for (const file of componentFiles) {
					const component = require(`../components/${folder}/${file}`);
					client.selectMenu.set(component.data.name, component);
				}
			case 'modals':
				for (const file of componentFiles) {
					const component = require(`../components/${folder}/${file}`);
					client.modals.set(component.data.name, component);
				}
			default:
				break;
		}
	}
};
