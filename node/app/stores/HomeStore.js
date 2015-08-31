var alt = require('../alt');

var HomeActions = require('../actions/HomeActions');

class HomeStore {
  constructor() {
    this.buildList = [];
    this.itemList = [];
    this.champId = 131;
    this.gameV = "5.11";

    this.itemStr = "";
    this.itemHash = "";

    this.userStats = [];
    this.userStats[0] = {
      'gold': 0,
      'kills': 0,
      'deaths': 0,
      'assists': 0,
      'cs': 0,
      'win': 0,
      'time': 0
    }; 

    this.champList = [];

    this.userBuild = [
      -1,
      -1,
      -1,
      -1,
      -1
    ];

    this.itemNum = 0; //what item are we looking at

    this.bindListeners({
    	getBuildList: HomeActions.GET_BUILD_LIST_SUCCESS,
    	getItemList: HomeActions.GET_ITEM_LIST_SUCCESS,
      getChampionList: HomeActions.GET_CHAMPION_LIST_SUCCESS,
      setChampId: HomeActions.SET_CHAMP_ID_SUCCESS,
      selectItem: HomeActions.SELECT_ITEM_SUCCESS,
      delItem: HomeActions.DEL_ITEM_SUCCESS,
      setVersion: HomeActions.SET_VERSION_SUCCESS
    });
  }

  setVersion(version) {
    this.gameV = version;

    this.delItemHelper(0);
    HomeActions.getBuildList(this.gameV, this.champId, this.itemHash);
  }

  delItemHelper(itemIndex) {
    var itemStrArr = this.itemStr.split(".");
    for(var i=itemIndex; i<this.userBuild.length; ++i) {
      if(this.userBuild[i] != -1) {
        itemStrArr.pop();
      }
      this.userBuild[i] = -1;
    }
    this.itemStr = itemStrArr.join(".");
    this.itemHash = btoa(this.itemStr);
    this.itemNum = itemIndex;
  }

  delItem(itemIndex) {
    this.delItemHelper(itemIndex);
    HomeActions.getBuildList(this.gameV, this.champId, this.itemHash);
  }

  selectItem(data) {
    var itemId = data.itemId;
    var i = data.i;
    this.itemStr = this.itemStr + "." + itemId;
    this.itemHash = btoa(this.itemStr);
    this.userBuild[this.itemNum] = itemId;
    this.itemNum++;

    //Add the new stats to the current stats
    this.userStats[this.itemNum] = {
      'gold': this.buildList[i].gold,
      'kills': this.buildList[i].kills,
      'deaths': this.buildList[i].deaths,
      'assists': this.buildList[i].assists,
      'cs': this.buildList[i].cs,
      'win': this.buildList[i].won_game,
      'time': this.buildList[i].end_game_time
    }; 

    HomeActions.getBuildList(this.gameV, this.champId, this.itemHash); //is this bad?
  }

  setChampId(champId) {
    this.champId = champId;

    this.delItemHelper(0); //reset the item build
    HomeActions.getBuildList(this.gameV, this.champId, this.itemHash);
  }

  initSuccess(data) {

  }

  getItemList(itemList) {
    var len = itemList.length;
    var iList = []
    console.log(len);
    for(var i=0; i<len; ++i) {
      iList[itemList[i].item_id] = itemList[i].item_name;
    }
  	this.itemList = iList;
  }

  getChampionList(itemList) {
    var len = itemList.length;
    var iList = []
    for(var i=0; i<len; ++i) {
      iList[itemList[i].champ_id] = itemList[i].champ_name;
    }
    this.champList = iList;
  }

  getBuildList(buildList) {
	 this.buildList = buildList;
  }

}

module.exports = alt.createStore(HomeStore, 'HomeStore');
