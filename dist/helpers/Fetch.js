Object.defineProperty(exports,'__esModule',{value:true});var _regenerator=require('babel-runtime/regenerator');var _regenerator2=_interopRequireDefault(_regenerator);var _keys=require('babel-runtime/core-js/object/keys');var _keys2=_interopRequireDefault(_keys);var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);var _nodeFetch=require('node-fetch');var _nodeFetch2=_interopRequireDefault(_nodeFetch);var _url=require('url');var _Upload=require('./Upload');var _Upload2=_interopRequireDefault(_Upload);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj}}var fetch=function(){var _this=this;function _callee(){var d,twoDateAgo,params,query,response,result,items,posts;return _regenerator2['default'].async(function(){function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.prev=0;d=new Date;twoDateAgo=(0,_moment2['default'])(new Date(d.setDate(d.getDate()-2))).format('YYYY-MM-DD');params={access_token:process.env.GITHUB_TOKEN,q:'language:javascript created:>'+String(twoDateAgo),sort:'stars',order:'desc'};query=(0,_keys2['default'])(params).map(function(k){return String(encodeURIComponent(k))+'='+String(encodeURIComponent(params[k]))}).join('&');_context.next=7;return _regenerator2['default'].awrap((0,_nodeFetch2['default'])('https://api.github.com/search/repositories?'+String(query),{method:'GET',headers:{'User-Agent':'Request-Promise'}}));case 7:response=_context.sent;_context.next=10;return _regenerator2['default'].awrap(response.json());case 10:result=_context.sent;if(result.total_count>0){items=result.total_count>process.env.FETCH_LIMIT?result.items.slice(0,process.env.FETCH_LIMIT):result.items;posts=items.map(function(item){var url=new _url.URL(item.url);return{url:url.href,title:item.full_name,description:item.description,image:item.owner.avatar_url,host:url.hostname,path:url.pathname}});(0,_Upload2['default'])(posts)}_context.next=17;break;case 14:_context.prev=14;_context.t0=_context['catch'](0);console.log(_context.t0);case 17:case'end':return _context.stop();}}}return _callee$}(),null,_this,[[0,14]])}return _callee}();exports['default']=fetch;