


!
	function(window){
		Rtree={"version":"1.0",author:"darkness"};
		window.Rtree=Rtree;

		Rtree.openStr='<span style="width: 10px;display: inline-block">+</span>';
		Rtree.closeStr='<span style="width: 10px;display: inline-block">-</span>';
		Rtree.nbspStr='<span style="width: 10px;display: inline-block"></span>';





	}(window),
	function(Rtree){
		Rtree.treeNode=function(jquerydiv){
			var thisobj=this;
			this.isHaveOpen=false;
			this.treeDeep=1;
			this.childNode=[];
			if(jquerydiv){
				var frontStr="";
				for(var i=0;i<this.treeDeep;i++){
					frontStr=frontStr+Rtree.nbspStr;
				}
				this.jquerydiv=jquerydiv.wrap("<div class='treeNode'></div>").parent().prepend("<span class='frontStr'>"+frontStr+"</span>");
			}

			this.hideChildNode=function(){
				for(var i=0;i<this.childNode.length;i++){
					this.childNode[i].jquerydiv.hide();
					if(this.childNode[i].childNode.length!=0){
						this.childNode[i].jquerydiv.children(".frontStr").children(".rtreeOpenThis").html(Rtree.openStr);
						this.childNode[i].hideChildNode();
					}
				}
			};

			this.showChildNode=function(){
				for(var i=0;i<this.childNode.length;i++){
					this.childNode[i].jquerydiv.show();
				}
			};

			this.addChildNode=function(jquerydiv){
				var thisNode=new Rtree.treeNode();
				this.childNode.push(thisNode);
				if(!this.isHaveOpen){
					this.isHaveOpen=true;
					var frontStr="";
					for(var i=0;i<(this.treeDeep-1);i++){
						frontStr=frontStr+Rtree.nbspStr;
					}
					frontStr=frontStr+"<span class='rtreeOpenThis'>"+Rtree.openStr+"</span>";
					this.jquerydiv.children(".frontStr").html(frontStr);

					this.jquerydiv.children(".frontStr").on("click",".rtreeOpenThis",function(e){
						if($(this).html()==Rtree.openStr){
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



				thisNode.treeDeep=this.treeDeep+1;
				var frontStr="";
				for(var i=0;i<thisNode.treeDeep;i++){
					frontStr=frontStr+Rtree.nbspStr;
				}
				thisNode.jquerydiv=this.jquerydiv.after(function(i){
					return "<div class='treeNode'><span class='frontStr'>"+frontStr+"</span></div>"
				}).next(".treeNode").append(jquerydiv).hide();



				return thisNode;
			};
			return this;
		};




	}(Rtree);