# myVaillant

Foobar is a Python library for dealing with word pluralization.

## Lokal ausführen
Erreichbar unter http://localhost:5000/
```bash
firebase serve --only hosting
```

## Testen bevor Deployment
Mehr Informationen unter https://firebase.google.com/docs/hosting/test-preview-deploy?authuser=0&hl=de#preview-channels
```bash
firebase hosting:channel:deploy preview_name
```

## Auf DEV deployen
Erreichbar unter https://my-vaillant-dev.web.app/
```bash
firebase deploy --only hosting:my-vaillant-dev
```
