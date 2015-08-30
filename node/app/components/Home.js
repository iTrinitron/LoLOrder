import React from 'react';
import HomeActions from '../actions/HomeActions';
import connectToStores from 'alt/utils/connectToStores';
import HomeStore from '../stores/HomeStore';
import classNames from 'classnames';

function ab_addItem(itemId) {
	glob.itemStr = glob.itemStr + "." + itemId;
	glob.itemHash = btoa(glob.itemStr);
	glob.items[glob.itemNum] = itemId;
	glob.itemNum++;
}


class BuildStatRow extends React.Component {
	render() {
		console.log(this.props.build);
		return (
			<div className="buildStatRow">
				{this.props.build.kills}
			</div>
		)
	}
}

class BuildStatList extends React.Component {
	render() {
		console.log(this.props.buildList);

		return (
			<div className="buildStatList">
	
			</div>
		)
	}

}

/*
 * ITEM BUILD AT TOP
 */
class Item extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	}
	handleClick(itemIndex) {
		this.props.delItem(itemIndex);
	}
	render() {
		var imgSrc = "img/EmptyIcon.png";
		if (this.props.itemId > 0) {
			imgSrc = "http://ddragon.leagueoflegends.com/cdn/5.15.1/img/item/" + this.props.itemId + ".png";
		}
		return (
			<div className="item">
				<div className="item-label">
					Item {this.props.i + 1}
				</div>
				<img className="img" onClick={this.handleClick.bind(this, this.props.i)} src={imgSrc}/>
			</div>
		)
	}
}

class ItemBuild extends React.Component {
	render() {
		return (
			<div className="item-build-list">
				{this.props.userBuild.map((itemId, i) => {
		          return (
		            <Item itemId={itemId} delItem={this.props.delItem} i={i}/>
		          );
		        })}
		        <div className="clear"></div>
			</div>
		)
	}
}

class ChampSelect extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	}
	handleClick(champId) {
		this.props.setChamp(champId);
		this.props.toggleSelect();
	}
	render() {
		var classes = classNames({ 
			'champSelect': true,
			'hidden': this.props.vis
		});
		return (
			<div className={classes}>
				{this.props.champList.map((champName, i) => {
					var imgSrc="http://ddragon.leagueoflegends.com/cdn/5.15.1/img/champion/" + champName + ".png";
		          return (
		          	<div>
		            	<img onClick={this.handleClick.bind(this, i)} src={imgSrc}/>
		            </div>
		          );
		        })}
			</div>
		)
	}
}

class Champion extends React.Component {
	constructor(props) {
	    super(props);
	    this.toggleSelect = this.toggleSelect.bind(this);
	    this.state = {champSelectVis: true};
	}
	toggleSelect() {
		this.setState({champSelectVis: !this.state.champSelectVis});
	}
	render() {
		var champImg = "img/ChampionSquare.png";
		if(this.props.champId > 0) {
			var champName = this.props.champList[this.props.champId];
			champImg = "http://ddragon.leagueoflegends.com/cdn/5.15.1/img/champion/" + champName + ".png";
		}
		return (
			<div className="item">
				<div className="item-label">
					Champion 
				</div>
				<img className="img" onClick={this.toggleSelect.bind(this)} src={champImg} />
				<ChampSelect toggleSelect={this.toggleSelect} vis={this.state.champSelectVis} setChamp={this.props.setChamp} champList={this.props.champList}/>
			</div>
		)
	}
}

class UserData extends React.Component {
	render() {
		return (
			<div className="item-build">
				<Champion setChamp={this.props.setChamp} champId={this.props.champId} champList={this.props.champList}/>
				<ItemBuild delItem={this.props.delItem} userBuild={this.props.userBuild}/>
			</div>
		)
	}
}

class UserStats extends React.Component {
	render() {
		return (
			<div className="userStats">
				<div className="head">
					<div>Popularity</div>
					<div>Gold</div>
					<div>Kills</div>
					<div>Deaths</div>
					<div>Assists</div>
					<div>CS</div>
					<div>Win %</div>
					<div>Game</div>
				</div>
				<div className="row">
					<div className="color-green">37%</div>
					<div className="color-green">+3.23</div>
					<div className="color-red">-3.23</div>
					<div className="color-green">+3.23</div>
					<div className="color-green">+3.23</div>
					<div className="color-green">+3.23</div>
					<div className="color-green">+3.23</div>
					<div className="color-green">+3.23</div>
					<div className="clear"></div>
				</div>
			</div>
		)
	}
}

class Header extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	    this.state = {version: true};
	}
	handleClick(itemId) {
		this.setState({version: !this.state.version});
		this.props.setVersion((this.state.version ? "5.14" : "5.11"));
	}
	render() {
		var one = classNames({ 
			'unset': !this.state.version
		});
		var two = classNames({ 
			'unset': this.state.version
		});
		return (
			<div className="header">
				<div className="container">
					<div className="title">
						<span className="color-white">LoL</span>Order
					</div>
					<div className="version" onClick={this.handleClick}>
						<span className={one}>5.11</span> - <span className={two}>5.14</span>
					</div>
					<UserData setChamp={this.props.setChamp} delItem={this.props.delItem} userBuild={this.props.userBuild} champList={this.props.champList} champId={this.props.champId}/>
					
				</div>
			</div>
		)
	}
}

class ItemListNode extends React.Component {
	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	}
	handleClick(itemId) {
		this.props.addItem(itemId);
	}
	render() {
		var classes = classNames({ 
			'item': true,
			'alt': (this.props.i%2==0) 
		});
		var imgSrc = "http://ddragon.leagueoflegends.com/cdn/5.15.1/img/item/" + this.props.itemData.item_id + ".png";
		return (
			<div className={classes} onClick={this.handleClick.bind(this, this.props.itemData.item_id)}>
				<div className="item-icon">
					<img className="img" src={imgSrc}/>
				</div>
				<div className="name">
					{this.props.itemList[this.props.itemData.item_id]}
				</div>
				<div className="color-green">{this.props.itemData.gold.toFixed(2)}</div>
				<div className="color-red">{this.props.itemData.kills.toFixed(2)}</div>
				<div className="color-green">{this.props.itemData.deaths.toFixed(2)}</div>
				<div className="color-green">{this.props.itemData.assists.toFixed(2)}</div>
				<div className="color-green">{this.props.itemData.cs.toFixed(2)}</div>
				<div className="color-green">{Math.round(this.props.itemData.won_game*100)}%</div>
				<div className="color-green">{Math.floor((this.props.itemData.end_game_time)/60)} min</div>
			</div>
		)
	}
}

class ItemList extends React.Component {
	render() {
		if(this.props.buildList.length > 0) {
			return (
				<div className="item-list">
					{this.props.buildList.map((itemObj, i) => {
						var itemName = this.props.itemList[itemObj.item_id];
			          return (
			            <ItemListNode {...this.props} addItem={this.props.addItem} itemData={itemObj} i={i}/>
			          );
			        })}
		        </div>
			)
		}
		else {
			return (
				<div>
					Whoops! No further data available for this build.
				</div>
			)
		}
	}
}

class ItemBuildList extends React.Component {
	render() {
		return (
			<div className="item-build-list">
				<div className="headers">
					<div className="item-icon">

					</div>
					<div className="name">
						Name
					</div>
					<div>Gold</div>
					<div>Kills</div>
					<div>Deaths</div>
					<div>Assists</div>
					<div>CS</div>
					<div>Win %</div>
					<div>Duration</div>
				</div>
				<ItemList buildList={this.props.buildList} itemList={this.props.itemList} addItem={this.props.addItem} />
			</div>
		)
	}
}

class Content extends React.Component {
	render() {
		return (
			<div className="content">
				<ItemBuildList buildList={this.props.buildList} itemList={this.props.itemList} addItem={this.props.addItem}/>
			</div>
		)
	}
}

class Footer extends React.Component {
	render() {
		return (
			<div className="footer">
				<div className="container">
					<div className="tag">
						<span className="color-white">Riot API Contest 2.0 Submission</span>
					</div>
					<div className="name">
						<span className="color-white">Michael C</span>
					</div>
		        </div>
	        </div>
		)
	}
}

@connectToStores
class Home extends React.Component {
	constructor(props) {
    	super(props);
    	this.addItem = this.addItem.bind(this);
    	this.delItem = this.delItem.bind(this);
  	}

	static getStores() {
		return [HomeStore];
	}

	static getPropsFromStores() {
		return HomeStore.getState();
	}

	componentDidMount() {
    	HomeActions.getBuildList(this.props.gameV, this.props.champId, this.props.itemHash);
    	HomeActions.getItemList();
    	HomeActions.getChampionList();
  	}

  	delItem(itemIndex) {
  		HomeActions.delItem(itemIndex);
  	}

  	addItem(itemId) {
  		HomeActions.selectItem(itemId);
  	}

  	setChamp(champId) {
  		HomeActions.setChampId(champId);
  	}

  	setVersion(version) {
  		HomeActions.setVersion(version);
  	}

	render() {
		return (
			<div className='Home'>
				<Header setVersion={this.setVersion} setChamp={this.setChamp} delItem={this.delItem} userBuild={this.props.userBuild} champList={this.props.champList} champId={this.props.champId} />
				<Content addItem={this.addItem} itemList={this.props.itemList} buildList={this.props.buildList} />
				<Footer />
			</div>
		);
	}
}

export default Home;