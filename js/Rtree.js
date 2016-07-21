


!
	function(window){
		Rtree={"version":"1.0",author:"darkness"};
		window.Rtree=Rtree;

		Rtree.openStr='<span style="width: 10px; display: inline-block;">+</span>';
		Rtree.closeStr='<span style="width: 10px; display: inline-block;">-</span>';
		Rtree.nbspStr='<span style="width: 10px; display: inline-block;"></span>';





	}(window),
	function(Rtree){
		Rtree.treeNode=function(jquerydiv,treeDeep){
			var thisobj=this;
			this.isHaveOpen=false;
			this.isopen=false;
			this.treeDeep=treeDeep?(treeDeep+1):1;
			this.childNode=[];


			if(jquerydiv){
				var frontStr="";
				for(var i=0;i<this.treeDeep;i++){
					frontStr=frontStr+Rtree.nbspStr;
				}
				this.jquerydiv=jquerydiv.prepend("<span class='frontStr'>"+frontStr+"</span>");
			}

			this.hideChildNode=function(){
				this.isopen=false;
				for(var i=0;i<this.childNode.length;i++){
					this.childNode[i].jquerydiv.stop().slideUp('fast');
					if(this.childNode[i].childNode.length!=0){
						this.childNode[i].jquerydiv.children(".frontStr").children(".rtreeOpenThis").html(Rtree.openStr);
						this.childNode[i].hideChildNode();
					}
				}
			};

			this.showChildNode=function(){
				for(var i=0;i<this.childNode.length;i++){
					this.childNode[i].jquerydiv.stop().slideDown('fast');
				}
			};

			this.addChildNode=function(jquerydiv,isClickAll){
				var thisNode=new Rtree.treeNode(jquerydiv,this.treeDeep);
				this.childNode.push(thisNode);
				if(!this.isHaveOpen){
					this.isHaveOpen=true;
					var frontStr="";
					for(var i=0;i<(this.treeDeep-1);i++){
						frontStr=frontStr+Rtree.nbspStr;
					}
					frontStr=frontStr+"<span class='rtreeOpenThis'>"+Rtree.openStr+"</span>";
					this.jquerydiv.children(".frontStr").html(frontStr);
					if(isClickAll){
						this.jquerydiv.click(function(e) {
							thisobj.isopen = !thisobj.isopen;
							if (thisobj.isopen) {
								$(this).children(".frontStr").children(".rtreeOpenThis").html(Rtree.closeStr);
								thisobj.showChildNode();
							} else {
								for (var i = 0; i < thisobj.childNode.length; i++) {
									thisobj.hideChildNode();
								}
								$(this).children(".frontStr").children(".rtreeOpenThis").html(Rtree.openStr)
							}
						});
					}else{
						this.jquerydiv.children(".frontStr").on("click",".rtreeOpenThis",function(e){
							thisobj.isopen=!thisobj.isopen;
							if(thisobj.isopen){
								$(this).html(Rtree.closeStr);
								thisobj.showChildNode();
							}else{
								for(var i=0;i<thisobj.childNode.length;i++){
									thisobj.hideChildNode();
								}
								$(this).html(Rtree.openStr)
							}
						});
					}

				}

				var frontStr="";
				for(var i=0;i<thisNode.treeDeep;i++){
					frontStr=frontStr+Rtree.nbspStr;
				}
				thisNode.jquerydiv.hide();
				return thisNode;
			};
			return this;
		};




	}(Rtree),
	function(Rtree){
		Rtree.treeTable=function(jquerytr,maintdindex,treeDeep){
			var thisobj=this;
			this.maintdindex=maintdindex?maintdindex:0;
			this.isHaveOpen=false;
			this.isopen=false;
			this.treeDeep=treeDeep?(treeDeep+1):1;
			this.childNode=[];
			this.jquerytr=jquerytr;

			var frontStr="";
			for(var i=0;i<this.treeDeep;i++){
				frontStr=frontStr+Rtree.nbspStr;
			}
			this.jquerytr.children("td:eq("+this.maintdindex+")").prepend("<span class='frontStr'></span>").children(".frontStr").html(frontStr).parent().parent();

			this.hideChildNode=function(){
				this.isopen=false;
				for(var i=0;i<this.childNode.length;i++){
					this.childNode[i].jquerytr.hide();
					if(this.childNode[i].childNode.length!=0){
						this.childNode[i].jquerytr.children("td:eq("+this.maintdindex+")").children(".frontStr").children(".rtreeOpenThis").html(Rtree.openStr);
						this.childNode[i].hideChildNode();
					}
				}
			};

			this.showChildNode=function(){
				for(var i=0;i<this.childNode.length;i++){
					this.childNode[i].jquerytr.show()
				}
				if(this.aftershowfunc){
					this.aftershowfunc();
				}
			};


			this.addChildNode=function(jquerytr,maintdindex){
				var thisNode=new Rtree.treeTable(jquerytr,maintdindex?maintdindex:this.maintdindex,this.treeDeep);
				this.childNode.push(thisNode);
				if(!this.isHaveOpen){
					this.isHaveOpen=true;
					var frontStr="";
					for(var i=0;i<(this.treeDeep-1);i++){
						frontStr=frontStr+Rtree.nbspStr;
					}
					frontStr=frontStr+"<span class='rtreeOpenThis'>"+Rtree.openStr+"</span>";
					this.jquerytr.children("td:eq("+this.maintdindex+")").children(".frontStr").html(frontStr);
					this.jquerytr.children("td:eq("+this.maintdindex+")").on("click",".frontStr .rtreeOpenThis",function(e){
						thisobj.isopen=!thisobj.isopen;
						if(thisobj.isopen){
							$(this).html(Rtree.closeStr);
							thisobj.showChildNode();
						}else{
							for(var i=0;i<thisobj.childNode.length;i++){
								thisobj.hideChildNode();
							}
							$(this).html(Rtree.openStr)
						}
					})
				}
				thisNode.jquerytr.hide();
				return thisNode;
			};

		}
	}(Rtree)