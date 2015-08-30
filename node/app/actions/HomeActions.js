var alt = require('../alt');

class HomeActions {
	constructor() {
		this.generateActions('getBuildListSuccess');  //Creates a default this.dispatch() version 
    this.generateActions('getItemListSuccess');
    this.generateActions('getChampionListSuccess');
    this.generateActions('selectItemSuccess');
    this.generateActions('setChampIdSuccess');
    this.generateActions('delItemSuccess');
    this.generateActions('setVersionSuccess');
  }

  selectItem(item_id) {
    this.actions.selectItemSuccess(item_id);
  }

  setChampId(champId) {
    this.actions.setChampIdSuccess(champId);
  }

  delItem(itemIndex) {
    this.actions.delItemSuccess(itemIndex);
  }

  setVersion(version) {
    this.actions.setVersionSuccess(version);
  }

	getBuildList(version, champId, itemHash) {
    version = version.replace(/\./g, "-");
    console.log('/api/' + version + "/" + champId + "/" + itemHash );
		$.ajax({ 
  			type: 'GET',
  			url: '/api/' + version + "/" + champId + "/" + itemHash 
  		})
      .done(data => {
        this.actions.getBuildListSuccess(data);
      })
      .fail(jqXhr => {
        //
      });
	}

  getItemList() {
    $.ajax({ 
        type: 'GET',
        url: '/api/items' 
      })
      .done(data => {
        this.actions.getItemListSuccess(data);
      })
      .fail(jqXhr => {
        //
      });
  }

  getChampionList() {
    $.ajax({ 
        type: 'GET',
        url: '/api/champs' 
      })
      .done(data => {
        this.actions.getChampionListSuccess(data);
      })
      .fail(jqXhr => {
        //
      });
  }

}

module.exports = alt.createActions(HomeActions);
