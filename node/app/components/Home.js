import React from 'react';
import HomeActions from '../actions/HomeActions';
import connectToStores from 'alt/utils/connectToStores';
import HomeStore from '../stores/HomeStore';
import classNames from 'classnames';

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
		if(this.props.itemNum >= itemIndex) {
			this.props.delItem(itemIndex);
		}
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
		            <Item itemNum={this.props.itemNum} itemId={itemId} delItem={this.props.delItem} i={i}/>
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
				<ItemBuild itemNum={this.props.itemNum} delItem={this.props.delItem} userBuild={this.props.userBuild}/>
			</div>
		)
	}
}

class UserStats extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div className="userStats">
				<div className="head">
					<div className="name">
					</div>
					<div>Gold</div>
					<div>Kills</div>
					<div>Deaths</div>
					<div>Assists</div>
					<div>CS</div>
					<div>Win %</div>
					<div>Game</div>
				</div>
				<div className="row">
					<div className="name">
						Current Stats Per Min
					</div>
					<div >{this.props.userStats[this.props.itemNum].gold.toFixed(2)}</div>
					<div >{this.props.userStats[this.props.itemNum].kills.toFixed(2)}</div>
					<div >{this.props.userStats[this.props.itemNum].deaths.toFixed(2)}</div>
					<div >{this.props.userStats[this.props.itemNum].assists.toFixed(2)}</div>
					<div >{this.props.userStats[this.props.itemNum].cs.toFixed(2)}</div>
					<div >{Math.round(this.props.userStats[this.props.itemNum].win*100)}%</div>
					<div >{Math.floor((this.props.userStats[this.props.itemNum].time)/60)} min</div>
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
					<UserData itemNum={this.props.itemNum} setChamp={this.props.setChamp} delItem={this.props.delItem} userBuild={this.props.userBuild} champList={this.props.champList} champId={this.props.champId}/>
					<UserStats itemNum={this.props.itemNum} userStats={this.props.userStats} />
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
	handleClick(itemId, i) {
		this.props.addItem(itemId, i);
	}
	getNumber(theNumber) {
	    if(theNumber > 0){
	        return "+" + theNumber.toFixed(2);
	    }else{
	        return theNumber.toFixed(2);
	    }
	}
	getNumberH(theNumber) {
	    if(theNumber > 0){
	        return "+" + theNumber;
	    }else{
	        return theNumber;
	    }
	}
	render() {
		var classes = classNames({ 
			'item': true,
			'alt': (this.props.i%2==0) 
		});
		var diff = {
			'gold': (this.props.itemData.gold - this.props.userStats[this.props.itemNum].gold),
			'kills': (this.props.itemData.kills - this.props.userStats[this.props.itemNum].kills),
			'deaths': (this.props.itemData.deaths - this.props.userStats[this.props.itemNum].deaths),
			'assists': (this.props.itemData.assists -  this.props.userStats[this.props.itemNum].assists),
			'cs': (this.props.itemData.cs -  this.props.userStats[this.props.itemNum].cs),
			'win': Math.round((this.props.itemData.won_game - this.props.userStats[this.props.itemNum].win)*100),
			'time': Math.floor((this.props.itemData.end_game_time - this.props.userStats[this.props.itemNum].time)/60)
		}

		var diffClasses = {
			'gold': classNames({ 
				'color-green': (diff.gold > 0),
				'color-red': (diff.gold < 0)
			}),
			'kills': classNames({ 
				'color-green': (diff.kills > 0),
				'color-red': (diff.kills < 0)
			}),
			'deaths': classNames({ 
				'color-green': (diff.deaths > 0),
				'color-red': (diff.deaths < 0)
			}),
			'assists': classNames({ 
				'color-green': (diff.assists > 0),
				'color-red': (diff.assists < 0)
			}),
			'cs': classNames({ 
				'color-green': (diff.cs > 0),
				'color-red': (diff.cs < 0)
			}),
			'win': classNames({ 
				'color-green': (diff.win > 0),
				'color-red': (diff.win < 0)
			}),
			'time': classNames({ 
				'color-green': (diff.time > 0),
				'color-red': (diff.time < 0)
			})
		} ;

		var imgSrc = "http://ddragon.leagueoflegends.com/cdn/5.15.1/img/item/" + this.props.itemData.item_id + ".png";
		return (
			<div className={classes} onClick={this.handleClick.bind(this, this.props.itemData.item_id, this.props.i)}>
				<div className="item-icon">
					<img className="img" src={imgSrc}/>
				</div>
				<div className="name">
					{this.props.itemList[this.props.itemData.item_id]}
				</div>
				<div className={diffClasses.gold}>{this.getNumber(diff.gold)}</div>
				<div className={diffClasses.kills}>{this.getNumber(diff.kills)}</div>
				<div className={diffClasses.deaths}>{this.getNumber(diff.deaths)}</div>
				<div className={diffClasses.assists}>{this.getNumber(diff.assists)}</div>
				<div className={diffClasses.cs}>{this.getNumber(diff.cs)}</div>
				<div className={diffClasses.win}>{this.getNumberH(diff.win)}%</div>
				<div className={diffClasses.time}>{this.getNumberH(diff.time)} min</div>
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
			            <ItemListNode itemNum={this.props.itemNum} userStats={this.props.userStats} {...this.props} addItem={this.props.addItem} itemData={itemObj} i={i}/>
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
				<ItemList itemNum={this.props.itemNum} userStats={this.props.userStats} buildList={this.props.buildList} itemList={this.props.itemList} addItem={this.props.addItem} />
			</div>
		)
	}
}

class Content extends React.Component {
	render() {
		return (
			<div className="content">
				<ItemBuildList itemNum={this.props.itemNum} userStats={this.props.userStats} buildList={this.props.buildList} itemList={this.props.itemList} addItem={this.props.addItem}/>
				<Footer />
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

  	addItem(itemId, i) {
  		console.log(itemId, i);
  		HomeActions.selectItem(itemId, i);
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
				<Header itemNum={this.props.itemNum} userStats={this.props.userStats} setVersion={this.setVersion} setChamp={this.setChamp} delItem={this.delItem} userBuild={this.props.userBuild} champList={this.props.champList} champId={this.props.champId} />
				<Content itemNum={this.props.itemNum} userStats={this.props.userStats} addItem={this.addItem} itemList={this.props.itemList} buildList={this.props.buildList} />
			</div>
		);
	}
}

export default Home;