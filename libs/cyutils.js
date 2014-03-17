function CYUTILS()
{
	
}
CYUTILS.piece = function(pString,pDelim,pNum) { return String(pString).split(pDelim)[pNum-1] } 


CYUTILS.get = function(pURL,pCallback)
				{
					require(["dojo/request"], 
						function(request)
						{
							request(pURL).then(pCallback)
						},
						function(err)
						{
							// handle an error condition
							alert("Error: "+err);
						}, 
						function(evt)
						{
							// handle a progress event																					
							alert("Event: "+evt);							
						})
				};
CYUTILS.post = function(pURL,pData,pCallback)
				{
					
					require(["dojo/request"], 
						function(request)
						{
							console.log(pURL)
							console.log(pData)
							console.log(pCallback.toString())
							request.post(pURL, pData).then(
								pCallback,
								function(err) {console.log(err)},
								function(evt) {console.log(evt)}
								)
							
						})
				};
