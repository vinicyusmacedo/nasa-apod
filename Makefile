CHROMEDRIVER=https://chromedriver.storage.googleapis.com/77.0.3865.40/chromedriver_$(PLATFORM).zip
DESTDRIVER=/usr/local/bin

ifndef PLATFORM
PLATFORM=mac64
endif

install: install-node install-test

install-node:
	npm install

install-test:
	curl $(CHROMEDRIVER) -o /tmp/chromedriver_$(PLATFORM).zip
	unzip /tmp/chromedriver_$(PLATFORM).zip -d $(DESTDRIVER)

test:
	npm test