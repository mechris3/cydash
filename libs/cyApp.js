function CYApp()
{
	
}
CYApp.UTILS = {}
CYApp.UTILS.kill = function kill(pId){ 
					var w = dijit.byId(pId); 
                    if (w) { w.destroy(); }
				
		}
CYApp.Modules={};
CYApp.Modules.ServiceConfiguration = function(pCP)
{
	var kill = CYApp.UTILS.kill;
	// we want a Drop Down (Select) with timezones
	// and a table with one column, of email addreses.
	// Finally 3 Buttons, Remove, Edit..., and Add...	
	var spans="<span id='spSCbtnRemove' ></span>";
	spans+="<span id='spSCbtnAdd' ></span>";
	spans+="<span id='spSCbtnEdit' ></span>";
	pCP.set("content", "<div id='dvTimezone'></div><div id='dvEmails' style='height:450px'>&nbsp;</div><div id='dvSCButtons'>"+spans+"</div>");
	
	
	// Drop Down
	require(["dojo/store/JsonRest"],
			function(JsonRest)
			{
				var timezoneStore = new JsonRest({target:"data/timezones.json", identifier: "id", idProperty: "id", searchAttr: "id"});									
				require(["dijit/form/Select"], 
				function(Select)
				{								
					var s = new Select({store:timezoneStore, labelAttr: "label", maxHeight: -1,  sortByLabel: false, style:"width:300px"},"dvTimezone");			
					s.set("maxHeight","500");
					var res=timezoneStore.query({selected:"true"}).forEach(
						function(p)
						{ 
							if (p.selected) 
							{ 
								s.set("value",p.id);								
								s.startup();		
													
							} 
						} )					
				})								
			});	
	// Data Grid			
	require(["dojo/store/JsonRest"], function(JsonRest)
			{
				myStore = new JsonRest({target:"data/emails.json"});				
				require(["dojox/grid/DataGrid", "dojo/data/ObjectStore","dojo/domReady!" ], 
					function(DataGrid, ObjectStore)
					{
						grid = new DataGrid(
						{
							store: dataStore = new ObjectStore({objectStore: myStore}),
							structure: 
							[
								{name:"Email Adress", field:"id", width: "100%"}
							]
						}, "dvEmails"); // make sure you have a target HTML element with this id
							grid.startup();
					});				
			});
	
	// Remove, Edit, Add buttons. Will not be adding the Save or Logout Button	
	require(["dijit/form/Button", "dojo/dom", "dojo/domReady!"], 
				function(Button, dom)
				{
					// Create a button programmatically:
					kill("btnSCEmailRemove");
					var btnSCRemove = new Button(
					{
						label: "Remove",
						id: "btnSCEmailRemove",
						disabled: true,
						onClick: function()
						{
							// Do something:
							// dom.byId("result1").innerHTML += "Thank you! ";
						}
					}, "spSCbtnRemove");
					
					// Create a button programmatically:					
					var btnSCEdit = new Button(
					{
						label: "Edit",
						disabled: true,
						onClick: function()
						{
							// Do something:
							// dom.byId("result1").innerHTML += "Thank you! ";
							require(["dijit/Dialog", "dojo/domReady!"], 
								function(Dialog)
								{
									myDialog = new Dialog
									(
										{
											title: "Edit Email Address",											
											style: "width: 500px",
											content: "<span>Email Address:&nbsp;&nbsp;&nbsp;</span><span id='spSCDLtxtEmail'>x</span><span id='spSCDLbtnSave'>x</span>"
										}
									);	
									require(["dijit/form/Button", "dojo/dom", "dojo/domReady!"], 			
										function() 
										{
											// need some text "Email Address:", textbox, and button	
											kill("spSCDLbtnSave")																															
											var btnUpdate = new Button(
											{
												label: "Update",
												disabled: true,
												onClick: function()
												{
													// Do something:
													// dom.byId("result1").innerHTML += "Thank you! ";
												}
											},"spSCDLbtnSave")
											
											kill("spSCDLtxtEmail")
											require(["dijit/form/TextBox", "dojo/domReady!"], 
												function(TextBox)
												{
													var myTextBox = new dijit.form.TextBox({
													name: "firstname",
													value: "" /* no or empty value! */,
													placeHolder: "type in your name"
												}, "spSCDLtxtEmail");
											});
											
											myDialog.show()
										});							
								}
								);
						}
					}, "spSCbtnAdd");
					
															// Create a button programmatically:
					var btnSCAdd = new Button(
					{
						label: "Add",
												onClick: function()
						{
							// Do something:
							// dom.byId("result1").innerHTML += "Thank you! ";
							require(["dijit/Dialog", "dojo/domReady!"], 
								function(Dialog)
								{
									myDialog = new Dialog
									(
										{
											title: "Add Email Address",											
											style: "width: 500px",
											content: "<span>Email Address:&nbsp;&nbsp;&nbsp;</span><span id='spSCDLtxtEmail'>x</span><span id='spSCDLbtnSave'>x</span>"
										}
									);	
									require(["dijit/form/Button", "dojo/dom", "dojo/domReady!"], 			
										function() 
										{
											// need some text "Email Address:", textbox, and button	
											kill("spSCDLbtnSave")																															
											var btnUpdate = new Button(
											{
												label: "Update",
												disabled: true,
												onClick: function()
												{
													// Do something:
													// dom.byId("result1").innerHTML += "Thank you! ";
												}
											},"spSCDLbtnSave")
											
											kill("spSCDLtxtEmail")
											require(["dijit/form/TextBox", "dojo/domReady!"], 
												function(TextBox)
												{
													var myTextBox = new dijit.form.TextBox({
													name: "firstname",
													value: "" /* no or empty value! */,
													placeHolder: "type in your name"
												}, "spSCDLtxtEmail");
											});
											
											myDialog.show()
										});							
								}
								);
						}
					}, "spSCbtnEdit");
					

					
				});


			

				
}


CYApp.Modules.Campaigns = function(pCP)
{
	var kill = CYApp.UTILS.kill;	
	// 
	
	require([
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
    "dojo/domReady!"
	], 
		function(BorderContainer, ContentPane)
		{
			// create a BorderContainer as the top widget in the hierarchy
			var bc = new BorderContainer({ style: "height: 300px; ", splitter:true  });

			// create a ContentPane as the left pane in the BorderContainer
			var cp1 = new ContentPane(
				{
					region: "left",
					id: "cp1CEmail",
					splitter:true,
					style: {height:"300px", width:"300px"},
					width: "300px",
					content: "<div id='dvBLCLLeft'></div>"
				});
		bc.addChild(cp1);

		// create a ContentPane as the center pane in the BorderContainer
		var cp2 = new ContentPane(
				{
					region: "center",
					splitter:true,
					content: "<div id='dvBLCLRight'></div>"
				});
		bc.addChild(cp2);
		
		// put the top level widget into the document, and then call startup()
		bc.placeAt(pCP);
		bc.startup();
				
		require(["dojo/dom", "dojo/request", "dojo/json","dojo/_base/array", "dojo/domReady!"],
					function(dom, request, JSON, arrayUtil)
					{												
						var c = "<div class='bloc' id='dvselCEmails' style='padding:0px'><select id='selCEmails' size='30' class='bloc' style='width:"+cp1.style.width+"' >";		
						c += "</select></div>";
						dvBLCLLeft.innerHTML=c;
								
						// Request the JSON data from the server
						request.get("data/campaigns.json", 
						{						
							handleAs: "json"
						}).then(	function(data)
									{
										for (var i=0;i<data.length;i++)
										{
											var t=dojo.byId("selCEmails");
											var option = document.createElement("option");
											option.innerHTML=data[i].id;
											t.add(option)																						
										}										
									}
								)
						
							require(["dojo/ready", "dojo/aspect", "dijit/registry"], 
									function(ready, aspect, registry) 
									{
										ready(function() 
										{
											aspect.after(registry.byId("cp1CEmail"), "resize", function() 
												{																		
													dojo.byId("selCEmails").style.width=dojo.byId("cp1CEmail").style.width
												});
										});
									});
						
						
						
						var t="<div id='dvBLCLRightCampaignAttributes'>";
						t+="<fieldset>";
						t+="<legend>Campaign Attributes</legend>";
						t+="<form>";
						t+="<div id='dvBLCLRightCampaignAttributesfrm' />";						
						t+="</form>";
						t+="</fieldset>";
						t+="</div><br/>";
						
						t+="<div id='dvBLCLRightCampaignSteps'>";
						t+="<fieldset>";
						t+="<legend>Campaign Steps</legend>";
						t+="<form>";
						t+="<div id='dvBLCLRightCampaignStepsfrm' />";						
						t+="</form>";
						t+="</fieldset>";
						t+="</div>";
						
						t+="<div id='dvBLCLRightBasketLineSelectionRule'>";
						t+="<fieldset>";
						t+="<legend>Basket Line Selection Rule</legend>";
						t+="<form>";
						t+="<div id='dvBLCLRightBasketLineSelectionRulesfrm' />";						
						t+="</form>";
						t+="</fieldset>";
						t+="</div>";

						dvBLCLRight.innerHTML=t;
						
						
						require(["dijit/form/Form","dijit/form/TextBox","dijit/form/CheckBox","dijit/form/Select","dojo/dom-construct"],
							function(frm,txt,chk,sel,domConstruct)
							{
								
								var frmCA = new frm({id:"frmCCA", title:"Campaign Attributes"},"dvBLCLRightCampaignAttributesfrm");								
								var txtName = new txt({ name: "txtCCAName", placeHolder: "type in your name", style:"width:475px;left:75px;top:35px;position:absolute"});								
								var txtGroup = new txt({ name: "txtCCAType", placeHolder: "", style:"width:200px;left:350px;top:75px;position:absolute"});								
								
								var dvLBLName=dojo.doc.createElement("div")
								dvLBLName.innerHTML="Name: ";
								dvLBLName.style.top="35px";
								frmCA.domNode.appendChild(dvLBLName);
								
								frmCA.domNode.appendChild(txtName.domNode)	

								var dvLBLType=dojo.doc.createElement("div");
								dvLBLType.innerHTML="Type: ";
								dvLBLType.style.top="75px";
								dvLBLType.style.position="absolute";
								frmCA.domNode.appendChild(dvLBLType)
																
								var dvLBLGroup = dojo.doc.createElement("div");
								dvLBLGroup.innerHTML="Group: ";
								dvLBLGroup.style.top="75px";
								dvLBLGroup.style.left="300px";
								dvLBLGroup.style.position="absolute";
								frmCA.domNode.appendChild(dvLBLGroup)
																
								frmCA.domNode.appendChild(dojo.doc.createElement("br"));
								
								frmCA.domNode.appendChild(txtGroup.domNode)			
								frmCA.domNode.appendChild(dojo.doc.createElement("br"))			
								
											
								var selType = new sel({ maxHeight: -1, 
													style:"width:200px;position:absolute;top:75px;left:75px",
													options: 
													[
															{ label: "Live", value: "Live" },
															{ label: "Control", value: "Control" },
															{ label: "Other", value: "Other" }															
													]});
																			
								frmCA.domNode.appendChild(selType.domNode)		

								
								// Campaign Steps
								var frmCSteps = new frm({id:"frmCSteps", title:"Campaign Steps"},"dvBLCLRightCampaignStepsfrm");	
								
								var spLBLRemarket1=dojo.doc.createElement("span")
								spLBLRemarket1.innerHTML="Re-market 1:&nbsp;&nbsp;&nbsp;";
								spLBLRemarket1.style.top="35px";
								frmCSteps.domNode.appendChild(spLBLRemarket1);	
																								
								var chkRemarket1 = new chk({name: "checkBox", value: "remarket1", checked: false});
								frmCSteps.domNode.appendChild(chkRemarket1.domNode)
								

								var spLBLAfter1=dojo.doc.createElement("span");
								spLBLAfter1.innerHTML="After";
								spLBLAfter1.style.position="absolute";
								//spLBLAfter1.style.left="300px";
								frmCSteps.domNode.appendChild(spLBLAfter1);
								
								
								var txtTime1 = new txt({ name: "txtTime1", placeHolder: "", style:"width:25px;position:absolute;margin-left:35px"});				
								frmCSteps.domNode.appendChild(txtTime1.domNode)
								
								var selRemarket1Period = new sel({ maxHeight: -1, 
													style:"width:75px;position:relative;top:0px;left:75px",
													options: 
													[
															{ label: "Minutes", value: "Minutes" },
															{ label: "Hours", value: "Hours" },
															{ label: "Days", value: "Days" }															
													]});		
								frmCSteps.domNode.appendChild(selRemarket1Period.domNode)													

								var spLBLESP1=dojo.doc.createElement("span");
								spLBLESP1.innerHTML="ESP: ";
								spLBLESP1.style.position="absolute";
								spLBLESP1.style.left="275px";
								frmCSteps.domNode.appendChild(spLBLESP1);
								
								
								var spLBLESP1sel=dojo.doc.createElement("span");
								spLBLESP1sel.id="spLBLESP1sel";
								frmCSteps.domNode.appendChild(spLBLESP1sel);
																
								// Drop Down
								require(["dojo/store/JsonRest"],
										function(JsonRest)
										{
											var ESPStore = new JsonRest({target:"data/esp.json", identifier: "id", idProperty: "id", searchAttr: "id"});									
											require(["dijit/form/Select"], 
												function(Select)
												{							
																									
													var s = new Select({
																			store:ESPStore, 
																			labelAttr: "label", 
																			maxHeight: -1, 
																			sortByLabel: false, 
																			style:"width:125px;left:115px;top:0px;position:relative"},"spLBLESP1sel");													
													//s.set("maxHeight","-1");
														
													var res=ESPStore.query({selected:"true"}).forEach(
														function(p)
														{ 
																										
															if (p.selected)  { s.set("value",p.id);} 
															s.startup();
														} )														
												})																	
										});									
								
								
								var spLBLCampaignId1=dojo.doc.createElement("span");
								spLBLCampaignId1.innerHTML="Campaign ID:";
								spLBLCampaignId1.style.position="relative";
								spLBLCampaignId1.style.left="120px";
								frmCSteps.domNode.appendChild(spLBLCampaignId1);
								
								
								
							});								
					}
					);				
});
	
}
