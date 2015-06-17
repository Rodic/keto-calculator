# [Keto Calculator](https://keto-kalkulator.herokuapp.com/)

App helps ketogenic dieters to:
1. determine recommended caloric and macro-nutrient intake
2. compose daily menus

DB has nutritional values for many food items rich in fats and proteins but low in carbs. To keep dieters safe from the bad food choices there are also nutritional values for a few items that look like a food for keto diet - but they are not!

Though you can use the app either in Serbian or English, at the moment DB only has items available on the Serbian market.

However, users can easily add new items. Added items will become available after admin verification.


## Gems

App requires following gems:

* Modified [humanizer](https://github.com/Rodic/humanizer) for anti-bot questions. Original don't have support for Serbian language.
* For uploading and saving images [paperclip](https://github.com/thoughtbot/paperclip) and [paperclip-dropbox](https://github.com/janko-m/paperclip-dropbox). Images are saved on Dropbox since Heroku doesn't allow write on the file system.
* [activeadmin](http://activeadmin.info/) for admin panel.
* [devise](https://github.com/plataformatec/devise) required by activeadmin.
* Modified [turbolinks](https://github.com/Rodic/turbolinks). Original doesn't update html's 'lang' attribute.
* [figaro](https://github.com/laserlemon/figaro) for security.
* [foundation-rails](https://github.com/zurb/foundation-rails) for integration with [Zurb Foundation](http://foundation.zurb.com/) frontend framework. 
* [chart-js-rails](https://github.com/coderbydesign/chart-js-rails) for rails integration with [chart.js](http://www.chartjs.org/)