chrome.runtime.onMessage.addListener(function(request,sender,sendResponse)
{
	var req={fighters:[]};
	if(request.player1)
		req.fighters.push('\''+request.player1+'\'');
	if(request.player2)
		req.fighters.push('\''+request.player2+'\'');
	if(req.fighters.length>0)
	{
		try
		{
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function()
			{
				if(this.readyState==4)
				{
					if(this.status==200)
						sendResponse({'success':JSON.parse(xhr.responseText)});
					else
						sendResponse({'error':'Response code '+this.status});
				}
			}
			xhr.open('POST','https://salty.imaprettykitty.com/',true);
			xhr.setRequestHeader('Content-type','application/json');
			xhr.send(JSON.stringify(req));
		}
		catch(error)
		{
			sendResponse({'error':'Error: '+error});
		}
	}
	return true;
});