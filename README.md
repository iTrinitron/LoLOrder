# LoLOrder | Order Matters
LolOrder is a data analytics project designed to assist players in their item-building decision process.  While traditional item build applications lay out entire six (6) item builds, LoLOrder provides players with the best option in respect to their current build.

Demo: http://lolorder.michaelrchin.com/

## Highlights
- Item by Item Build Statistics!

## Columns

Items are sorted by their popularity in descending order.

- Gold: Average gold earned per minute when following this build path
- Kills: Average kills per minute when following this build path
- Deaths: Average deaths per minute when following this build path
- Assists: Average assists per minute when following this build path
- CS: Average creep score per minute when following this build path
- Win %: Average win percentage when following this build path
- Duration: Average time a game will last when following this build path

## Tools
- Anaconda Python 
- MySQL 
- Node
- ReactJS
- Alt Flux

## Dataset
Data was obtained from Riot Games API.  It consists of 60,000 ranked 5v5 games across six regions (KR, EUNE, OCE, LAS, LAN, and NA) and two game versions (5.11, 5.14)

## Process
1. Static Data was obtained from Riot Games API (Item, Champion, etc)
2. Match Data was processed from Riot Games API
3.

### Match Data Processing
Processing every single match was the bulk of this project.  
- For every match, I looked for players that were playing characters that I recognized as "AP" Champions. These players' builds were selected to be tracked
- If the player ran smite, however, I removed them from the tracking process because inconsistences would occur since an AP Jungler would have a different than their Mid Lane counterpart
- Viktor was also removed from the tracking process due to his special item
- [Human Error] I mistakenly used an old list of AP champions, and thus the final dataset only contains 23 champions
- Each match was then processed frame by frame.  Whenever an item was purchased, it was registered to it's corresponding buyer along with any kills/deaths/assists executed after the item's purchase, and before the buyer's next purchase.
- The difference between item stat totals were then calculated and divided by the timestamp difference to figure out the item's stat per minute value (ex. total gold of item2 - total gold of item1 / time difference = gold per minute value of item1)
- The data was then aggregated for each unique item build (order matters), champion, and game version to serve the front-facing application.

### Front-End
The front-end application was built using NodeJS, ReactJS, and the Flux architecture. This was my first time deploying an application with these frameworks, but it turned out to be much simpler than I imagined!
