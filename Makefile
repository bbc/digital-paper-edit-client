# https://opensource.com/article/18/8/what-how-makefile
.PHONY: all react-install react-start react-build server-start electron-start electron-build cept-panel-setup cep-panel-assemble cep-panel-start cep-panel-build
# .ONESHELL:

# all: react-start server-start

# React
install-react:
	@echo "React npm install"
	cd ./packages/client && npm install

start-react:
	@echo "React start"
	cd ./packages/client && npm start

build-react: react-install
	@echo "React build"
	cd ./packages/client && npm run build

# Server
install-server:
	@echo "Server install"
	cd ./packages/server && npm install

start-server:
	@echo "Server start"
	cd ./packages/server && npm start

# Electron
install-electron:
	@echo "electron install"
	cd ./packages/electron && npm install

start-electron:
	@echo "electron start"
	# need to start react-start in seprate build
	cd ./packages/electron && npm start

build-electron: react-build
	@echo "Electron build"
	# does areact-build
	# clears build folder inside of electron
	rm -rf ./packages/electron/build
	rm -rf ./packages/electron/dist
	# then copies the react build folder into electron folder
	cp -a ./packages/client/build ./packages/electron/build
	# build/package electron for mac, wind and linux
	cd ./packages/electron && npm run build:mwl

# Adobe CEP Panel 
setup-cep-panel:
	@echo "Setting Premiere debug mode to accept unsigned extensions"
	defaults write com.adobe.CSXS.5 PlayerDebugMode 1
	defaults write com.adobe.CSXS.6 PlayerDebugMode 1
	defaults write com.adobe.CSXS.7 PlayerDebugMode 1
	defaults write com.adobe.CSXS.8 PlayerDebugMode 1
	@echo "Done, please restart your computer"

assemble-cep-panel:
	@echo "Adobe CEP Panel - Assemble relevant files"
	# TODO: clear directory  ./packages/cep/build and recreate 
	rm -rf ./packages/cep/build
	# TODO: move relevant files from react and electron backend into ./packages/cep/build
	mkdir -p ./packages/cep/build
	# eg 
	# sync-files adobe-panel-src adobe-panel-build 
	# && sync-files electron adobe-panel-build/electron 
	# && sync-files lib adobe-panel-build/lib 
	# &&  sync-files ./package.json adobe-panel-build/package.json 
	# && sync-files node_modules  adobe-panel-build/node_modules

start-cep-panel: cep-panel-assemble
	@echo "Adobe CEP Panel start"
	@echo "make directory for Adobe CEP extensions if not present"
	mkdir -p ~/Library/Application\ Support/Adobe/CEP/extensions/
	# TODO: need to decide what to move into Adobe CEP extension folder, ideally jsut content of ./packages/cep/build
	cd ./packages/cep/build && cp -R $PWD ~/Library/Application\ Support/Adobe/CEP/extensions/autoedit2-panel
	# sync-files adobe-panel-src ~/Library/Application\\ Support/Adobe/CEP/extensions/autoedit2-panel
	
build-cep-panel: react-build cep-panel-assemble
	@echo "Adobe CEP Panel build"
	@echo "Adobe CEP Panel - packaging and code signing for distribution"
	# node ./package/cep/scripts/sign-and-package-adobe-panel.js
