function cy()
{
	this.login = {};
	this.login.username = "";
	this.login.password = "";
	this.login.token = "";
	var proxy = "https://localhost/seewhy/proxy.php"
	var loginurl = "https://test.saas.seewhy.com/ServicesUserLogin/UserLogin?Action=LogUserOn&Password=s33why&UserName=3633@358.com";		
	                
	var configurl = "https://test.saas.seewhy.com/ATProGUIClient/ATProConfig";
	var parent=this;
	var getToken = function()
	{				
		
		var t=proxy+"?url="+encodeURIComponent(loginurl);
		document.getElementById("dvMain").innerHTML+="<br/>Making Request to: "+t;
		CYUTILS.get(t,
			function(pText)
			{
				document.getElementById("dvMain").innerHTML+="<br/>Response: "+pText;
				var t=CYUTILS.piece(pText,"**",3);			
				parent.login.token=t.split("=")[1];
				var token=parent.login.token;			
				document.cookie="__utma=125830031.1373540636.1393860434.1394014770.1394026822.6; __utmc=125830031; "
				document.cookie+="__utmz=125830031.1393860434.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); JSESSIONID="+token;					
				alert("HI")
				require(["dojo/on", "dojo/topic", "dojo/dom-construct", "dojo/dom", "dojo/domReady!"],				
				function(on, topic, domConstruct, dom) 
				{
					
																					
					// Register the alerting routine with the "alertUser" topic.
					topic.subscribe("loggedIn", function(pToken)
					{
						alert(pToken)
						_login(pToken)
					});
					topic.publish("loggedIn", parent.login.token);
				});							
			});	
	}	
	this.doLogin = function(text) { 	 getToken(text); }
	function _login(pToken)
	{	
		require(["dojo/request"], 
			function(request)
			{																				
				
				var data =
					{
						Action:			"RetrieveConfigMetaData",
						ServiceCode:	"XT43813863",
						UserName:		"3633@358.com",
						LoginToken:		pToken															
					}									
					//CYUTILS.post = function(pURL,pData,pCallback)
				
				CYUTILS.post(proxy+"?url="+encodeURIComponent(configurl),data,
						function(d)
						{
							alert(d)
							document.getElementById("dvMain").innerHTML=d;
						})
				
			})
	}
}


