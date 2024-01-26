# getpocket to markdown migration tool

## prerequis
follow https://getpocket.com/developer/ documentation to export your previous pins with API.

### raw example
```
{
  "3115202867": {
    "item_id": "3115202867",
    "resolved_id": "3115202867",
    "given_url": "https:\/\/www.youtube.com\/watch?v=Vp5ANvd88x0",
    "given_title": "",
    "favorite": "0",
    "status": "0",
    "time_added": "1600462330",
    "time_updated": "1600462339",
    "time_read": "0",
    "time_favorited": "0",
    "sort_id": 1,
    "resolved_title": "Evan You \/\/ Keynote: Live Free Online Announcement \/\/ Vuejs Global Online",
    "resolved_url": "https:\/\/www.youtube.com\/watch?v=Vp5ANvd88x0",
    "excerpt": "Evan You will be Live on Friday 18th September to reveal something special for the Vuejs and Javascript Community. Evan You the Creator of Vue will be delivering a keynote Live and Free for the public. \n\nVue.js Global Online Conference\n17-18th September 2020\n\nVuejs Amsterdam will take place ONLINE F",
    "is_article": "0",
    "is_index": "0",
    "has_video": "2",
    "has_image": "1",
    "word_count": "0",
    "lang": "",
    "domain_metadata": {
      "name": "YouTube",
      "logo": "https:\/\/logo.clearbit.com\/youtube.com?size=800",
      "greyscale_logo": "https:\/\/logo.clearbit.com\/youtube.com?size=800&greyscale=true"
    },
    "listen_duration_estimate": 0
  },
}

```

## start import
1. install npm dependencies with command 'npm ci'
2. init project with commande 'npm run init'
3. add file in /impots folder
4. edit 'importFile' const in app.js

## start exports
1. run command 'npm run export'
2. get exports file in /exports folder

## next
- import these documents in your note app
- save these documents in your dropbox / google drive / ...
- do what you want !
