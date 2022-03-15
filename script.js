	
		var Game = {};
		var all = [];
		var allweak = [];
		var remainings = [];

		var Data = {};
		
		// var mon = Game.mon = [];
		var pre = [];



			var satu = [
				"5/56"
				,"0/0b"
				,"f/f6"
				,"3/3c"
				,"b/bb"
				,"b/be"
				,"a/ab"
				,"0/09"
				,"0/08"
				,"3/38"
				,"8/8d"
				,"8/88"
				,"c/c4"
				,"a/a6"
				,"e/e0"
				,"a/a0"
				,"a/a9"
				,"a/aa"
			];

		function weakrecap(mon_,swipe){			
			var m = 0;

			mon_.dual = false;
			if (mon_.type1==mon_.type2) mon_.dual = false; else mon_.dual = true;

			if (mon_.immun=="anti-ele,rock,ice"){
				var n = 0;
				// k.forEach(function(l){
				// 	Game.listofimmun.forEach(function(i){
				// 		// console.log(Game.types[n]);
						
				// 		//if (/*mon_.immun=="anti-"+i && */Game.types[n]==i)
				// 		//	k[n] -= 99;
				// 	});
				// 	n++;
				// 	// console.log(mon_.immun, mon_.weakrecap.Matrices);
				// })
			}
			
			mon_.weakrecap.Matrices.forEach(function(k){
				var n = 0;
				k.forEach(function(l){
					if (m==0) {	//type1
						k[n] = Game.chart[Game.types.indexOf(mon_.type1)][n];	//type1
						k[n] = k[n] || Game.chart[Game.types.indexOf(mon_.type1)][n];

						Game.listofimmun.forEach(function(i){
							if (mon_.immun=="anti-"+i && Game.types[n]==i)
								k[n] -= 99;
							else if (mon_.immun=="anti-ele,rock,ice" 
								&& (Game.types[n]=="electric" || Game.types[n]=="rock" || Game.types[n]=="ice")
							){
								k[n] -= 99;
							}
						});
					} else 
					if (m==1) {	//type2
						k[n] = Game.chart[Game.types.indexOf(mon_.type2)][n];	
						k[n] = k[n] || Game.chart[Game.types.indexOf(mon_.type2)][n];

						Game.listofimmun.forEach(function(i){
							if (mon_.immun=="anti-"+i && Game.types[n]==i)
								k[n] -= 99;
							else if (mon_.immun=="anti-ele,rock,ice" 
								&& (Game.types[n]=="electric" || Game.types[n]=="rock" || Game.types[n]=="ice")
							){
								k[n] -= 99;
							}
						});
					} else 
					if (m==2 && mon_.type3) {	//type3
						if(mon_.type3 && Game.chart[Game.types.indexOf(mon_.type3)]/*[n]*/){
							k[n] = Game.chart[Game.types.indexOf(mon_.type3)][n];
							k[n] = k[n] || Game.chart[Game.types.indexOf(mon_.type3)][n];
						} else if (!mon_.type3){
							k[n] = k[n];
						}
					}
					n++;
				});
				m++;
			});

			m = 0;
			mon_.weakrecap.Toggle.forEach(function(k){
				if (mon_.weakrecap.Matrices[0][m] + mon_.weakrecap.Matrices[1][m] > 0){
					mon_.weakrecap.Toggle[m] = true;
				} else mon_.weakrecap.Toggle[m] = false;//false;
				
				//type3
					// if (mon_.type3) console.log(mon_.type3, mon_.weakrecap.Matrices[2]);
				if (mon_.weakrecap.Matrices[2] && (mon_.weakrecap.Matrices[2][m]==0||mon_.weakrecap.Matrices[2][m]!=undefined)){
					var t1 = mon_.weakrecap.Matrices[0][m];
					var t2 = mon_.weakrecap.Matrices[1][m];
					var t3 = mon_.weakrecap.Matrices[2][m];
					
					// if ((mon_.weakrecap.Matrices[0][m] + mon_.weakrecap.Matrices[2][m]) + (mon_.weakrecap.Matrices[1][m] + mon_.weakrecap.Matrices[2][m]) > 0)
		   			
					// console.warn(Game.types[m], t1*t3,mon_.dual);
					if (!mon_.dual){
						if(((t1||t2)+t3)>0) 
							mon_.weakrecap.Toggle[m] = true;
						else mon_.weakrecap.Toggle[m] = false;
					} else {
			   			if((t1+t2) + (t2+t3) + (t1+t3)>1) {
							mon_.weakrecap.Toggle[m] = true;
			   			}
						else mon_.weakrecap.Toggle[m] = false;
					}
				}
				m++;
			});

			m = 0;
			mon_.weakto = [];
			mon_.weakrecap.Toggle.forEach(function(k){
				if (k) mon_.weakto.push(Game.types[m]);
				m++;
			});


			m = 0;
			if (mon_.weakness) mon_.weakness.forEach(function(w){
				var u = 0;
				w.forEach(function(w_){

					mon_.weakto.forEach(function(w2){
						if (u==Game.types.indexOf(w2)){
							//console.log(m,u);
							mon_.weakness[m][u] *= Game.chart[m][u];
						}
					});
					u++;
				});
				m++;
			});
		}

		function redraw(matrices){
			var mon = Game.mon;
			if (!matrices){
				matrices = all;
			}

			if (!matrices) return alert(1);
			// if (matrices.length!=Game.max) return alert(2);
			// if (matrices[0].length!=Game.max) return alert(3);

			if (!matrices){
				matrices = all;
			}
			var a=1;
			matrices.forEach(function(h){
				var b=1;
				h.forEach(function(v){
					if (document.getElementById("tbl_"+a+"_"+b)){
						document.getElementById("tbl_"+a+"_"+b).innerText = v;
						if (v==0){
							document.getElementById("tbl_"+a+"_"+b).style.backgroundColor = Data.Color.notok;
						} else document.getElementById("tbl_"+a+"_"+b).style.backgroundColor = Data.Color.ok;
					}
					b++;
				});
				a++;
			});

			if (mon) for (var a=1; a<mon.length+1; a++){
				document.getElementById("mon"+a+"_t1").innerHTML = "<img width="+Data.Univ.Width+" src='https://serebii.net/pokedex-bw/type/"+mon[a-1].type1+".gif' alt='"+mon[a-1].type1+"'>";
				
				document.getElementById("mon"+a+"_t2").innerHTML = "<img width="+Data.Univ.Width+" src='https://serebii.net/pokedex-bw/type/"+mon[a-1].type2+".gif' alt='"+mon[a-1].type2+"'>";

			}

			document.getElementById("maindiv").style.backgroundColor = "rgb("+(Number(+75+gametotal()))+", "+(Number(+75+gametotal()))+", "+(Number(+75+gametotal()))+")";
		}

		function default_(val,row,col){
			if (val==undefined) return [];
			if (!row) return [];
			if (!col) var col = row;

			var matrices = [];

			if (row==1) {
				matrices = [];
				for (var i=0; i<col; i++){
					matrices[i] = val;
				}
			} else {
				for (var a=0; a<row; a++){
					matrices.push([]);
					for (var b=0; b<col; b++){
						matrices[a][b] = val;
					}
				}
			}

			//console.warn(matrices);
			return matrices;
		}

		function fill(target,source){
			//only for 2D array
			if (!target) target = [];
			for (var a=0; a<Game.max; a++){
				if (!target[a]) target.push([]);
				for (var b=0; b<Game.max; b++){
					target[a][b] = source[a][b];

				}
			}			
		}

		function maketemp(t1,t2,im,add){
			var temp = {};

			if (!t1 || !t2) return false;

			temp = {
				"type1": t1,
				"type2": t2,
				"immun": im,
				"type3": add,
				"weakrecap" : {
					"Matrices" : default_(0,2,Game.max),//[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
					"Toggle" : default_(false,1,Game.max)//[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
				}
			}

			return temp;
		}

		function gametotal(){
			Game.total = Math.round(Game.max * Game.max);
			// var h = 1;
			all.forEach(function(k){
				// var i = 1;
				k.forEach(function(j){
					if (j==0) Game.total--;
					
					// i++;
				});
				// h++;
			});
			Game.total = Math.round(Game.total/2);
			// console.warn(Game.total);
			return Game.total;
		}

		function subtotal(id){			
			var mon = Game.mon;
			fill(mon[id].subtotal, default_(1, Game.max));

			var a=0;
			mon[id].subtotal.forEach(function(k){
				var b=0;
				k.forEach(function(j){
					var temp = maketemp(Game.types[a],Game.types[b]);					
					weakrecap(temp);
					temp.weakto.forEach(function(c){
						mon[id].weakto.forEach(function(d){
							if (c==d){
								mon[id].subtotal[a][b] = 0;
							}
						});
					});
					
					//mon[id].subtotal[a][b] = 0;//Game.chart[a][b];
					
					b++;
				});
				a++;
			});

			reset("all");

			redraw();			

			gametotal();
		}

		function recolorchosen(mon){
			var mon = Game.mon;
			if (mon) mon.forEach(function(m){
				if (document.getElementById("tbl_"+m.id)){
					document.getElementById("tbl_"+m.id).style.backgroundColor = "#0000ff";
				} else if (document.getElementById("tbl_"+m.id.split("_")[1] + "_" + m.id.split("_")[0])){
					//and
					document.getElementById("tbl_"+m.id.split("_")[1] + "_" + m.id.split("_")[0]).style.backgroundColor = "#0000ff";
				}
			});			
		}

		function avail_check(mon){			
			var mon = Game.mon;			
			for (var w=1;w<mon.length+1; w++){

				//default, retrieved from local html
				/*if(document.getElementById("avail_"+w) && document.getElementById("db_"+Game.types.indexOf(mon[w-1].type1)+"_"+Game.types.indexOf(mon[w-1].type2))) 
					document.getElementById("avail_"+w).innerText = document.getElementById("db_"+Game.types.indexOf(mon[w-1].type1)+"_"+Game.types.indexOf(mon[w-1].type2)).innerText;

				if (document.getElementById("avail_"+w).innerText == 0) {
					document.getElementById("avail_"+w).style.backgroundColor = Data.Color.notok;
					document.getElementById("avail_"+w).innerText = "X";
				} else {
					document.getElementById("avail_"+w).style.backgroundColor = "#ffffff";	
				}*/
			}
		}

		function selectcell (a,i,t3){			
			var mon = Game.mon;
			if (event && event.srcElement && event.srcElement.disabled==true && Game.restriction){
				return false;
			}

			if (document.getElementById("helpdiv")){
				if (document.getElementById("helpdiv").style.height == "80%")
					document.getElementById("helpdiv").style.height = "0%";
				
			}
			
			// console.log("-------------",a,i,t3);

			if (document.getElementById("table_4a"))
				document.getElementById("table_4a").innerHTML = "";

			if (document.getElementById("table_4b"))
				document.getElementById("table_4b").innerHTML = "";

			var t1 = a.split("_")[0]-1;
			var t2 = a.split("_")[1]-1;
			var a_rev = a.split("_")[1]+"_"+a.split("_")[0];
			
			var now = function(){
				return mon.length;
			}

			if (mon.length>=Game.numofpoke) {
				alert("It is now limited to "+Game.numofpoke+" pokemon only. Click (+) to add more.");
				return false;
			} 
			else {			
				var dual = false;
				if (t1==t2) dual = false; else dual = true;

				var temp = maketemp(Game.types[a.split('_')[0]-1],Game.types[a.split('_')[1]-1]);
				temp.dual = dual;
				temp.immun = i;
				// imunis(i);
				/*if (i) {
					temp.immun = String(i);
					console.warn(temp.immun);
				}*/
				temp.weakto = [];
				temp.subtotal = [];
				temp.weakness = [];
				temp.id = a;
				temp.type3 = t3;

				mon.push(temp);
				// if (mon && mon[1]) console.error(mon[1].immun);
				fill(mon[mon.length-1]["weakness"],default_(1, Game.max));
				weakrecap(mon[mon.length-1]);

				document.getElementById("mon"+now()+"_t1").innerText = Game.types[a.split('_')[0]-1];
				document.getElementById("mon"+now()+"_t2").innerText = Game.types[a.split('_')[1]-1];
				
				document.getElementById("mon"+now()+"_t1").innerHTML = "<img width=30 src='https://upload.wikimedia.org/wikipedia/commons/thumb/"+Game.wikitype[a.split('_')[0]-1]+"/Pok%C3%A9mon_"+Game.typesUp[a.split('_')[0]-1]+"_Type_Icon.svg/240px-Pok%C3%A9mon_"+Game.typesUp[a.split('_')[0]-1]+"_Type_Icon.svg.png'</img>";
				
				document.getElementById("mon"+now()+"_t2").innerHTML = "<img width=30 src='https://upload.wikimedia.org/wikipedia/commons/thumb/"+Game.wikitype[a.split('_')[1]-1]+"/Pok%C3%A9mon_"+Game.typesUp[a.split('_')[1]-1]+"_Type_Icon.svg/240px-Pok%C3%A9mon_"+Game.typesUp[a.split('_')[1]-1]+"_Type_Icon.svg.png'</img>";

				
				if (
					Game.chartver!='1'
					&& Game.title!='GSC'
				){
					document.getElementById("imun_sel_"+now()).disabled = false;
					if (i||i==0){
						document.getElementById("imun_sel_"+now()).value = "anti-"+Game.types[i];
						imunis(now());
					}
				} 
				if (Game.chartver=='3' || Game.chartver=='9'){
					document.getElementById("confplus_sel_"+now()).disabled = false;
					if (t3){
						var type3id_list = Data.Univ.Type3s;
						document.getElementById("confplus_sel_"+now()).value = "type3-"+(type3id_list.indexOf(t3)+1);
						// document.getElementById("confplus_sel_"+x).disabled = false;
						if (document.getElementById("confplus_sel_"+now()).value!=""){
							document.getElementById("confplus_"+now()).appendChild(document.createElement("img")).outerHTML = "<br><img width="+Data.Univ.Width+" src='https://serebii.net/pokedex-bw/type/"+t3+".gif' alt='"+t3+"'>";				
							document.getElementById("confplus_"+now()).style.width = "0px";
							// document.getElementById("confplus_sel_"+now()).style.width = Data.Univ.Width;
						}
						//@
						var t3arr = [];
						Game.types.forEach(function(t){
							if (!t3) t3arr[Game.types.indexOf(t)] = 1;
							else t3arr[Game.types.indexOf(t)] = -99;//(Game.chart[Game.types.indexOf(t3)][Game.types.indexOf(t)]);				
						});
						mon[now()-1].weakrecap.Matrices[2] = t3arr;
						if (!t3 && mon[now()-1].weakrecap.Matrices.length>2) {
							// console.error(9)
							mon[now()-1].weakrecap.Matrices.pop();
						}
						weakrecap(mon[now()-1]);
						recalculate("allweak");
					}
				}


				recalculate("allweak");

				subtotal(mon.length-1);

				reset("safe");

				document.getElementById("imun_sel_"+now()).focus();
			}

			// console.log(mon[0].weakto);

			if (document.getElementById("tbl_"+a) && document.getElementById("tbl_"+a_rev)){
				if (document.getElementById("tbl_"+a).innerText==1 || mon.length<Game.numofpoke+1){
					document.getElementById("tbl_"+a).innerText = 0;
					document.getElementById("tbl_"+a).style.backgroundColor = Data.Color.notok;

					document.getElementById("tbl_"+a_rev).innerText = 0;
					document.getElementById("tbl_"+a_rev).style.backgroundColor = Data.Color.notok;
				} 
			}

			avail_check(mon);

			redraw();

			freemode();

			recolorchosen(mon);

			document.getElementById("monnum").innerText = String(mon.length + "/" + Number(document.getElementById("tr2_0").children.length-1));


			if (!Game.slot) Game.slot = [];
			Game.slot[now()-1] = getPokemonData(["type",mon[now()-1].type1,now()]);
			
			// console.warn(99, mon[now()-1].name, Game.slot__[now()]);
			//wait why do i do this?
			// Game.slot = [];
			// Game.slot_ = [];			
			// if (document.getElementById("avail_sel_"+now()))
			// 	document.getElementById("avail_sel_"+now()).innerHTML = "<option value selected></option>";
		}

		function naming(){
			var i=0; 
			
			for (var i=0; i<$(".cell-total").length; i++){
				var ct = $(".cell-total")[i];
			    var head = ct.parentElement.children[0].children[0].innerText.toLowerCase();
		    	// console.log("====");
				var nimi = "", nimi2="";
				nimi = String(head);
				nimi.split(" ").forEach(function(s){
					Game.types.forEach(function(t){
						if (s==t){
							nimi2 += Number(Game.types.indexOf(t))+"_";
						}
					});
				});
				if (nimi2.length<=3){
					nimi2 += nimi2.split("_")[0];
				} else nimi2 = nimi2.slice(0,nimi2.length-1);

				// console.log(nimi2,ct);
				ct.setAttribute("id","db_"+nimi2);
			}
			if (document.getElementById("database")) document.body.appendChild(document.getElementById("database"));
			document.body.appendChild(document.getElementById("embed"));

			reset("safe");				
		}

		function begin(ver){
			// alert(9)
			//return false;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			        Data = JSON.parse(this.responseText);
			        
			        if (document.getElementById("chartver").children.length<2)
				        ["a","b"].forEach(function(mode){
							Data.Verlist[mode].forEach(function(x){
				        		if (x.selected && x.selected==true) document.getElementById("chartver").innerHTML += "<option selected value="+x.base+">"+x.title+"</option>"
								else document.getElementById("chartver").innerHTML += "<option value="+x.base+">"+x.title+"</option>"
							})
							document.getElementById("chartver").innerHTML += "<option disabled>---------</option>";
				        })
					// Data.Verlist.b.forEach(function(b){
					// 	document.getElementById("chartver").innerHTML += "<option value="+a.base+">"+a.title+"</option>"
					// })

			        var ver = ver;
			        if (!ver) 
			        	if (document.getElementById("chartver")){
			        		ver = document.getElementById("chartver").value;
			        	}
			        // ver = 3;//default is gen 6       
			        
					Game.mon = {};
			        // console.log(ver,Data,Game.title);
					Game = {
						"chartver" : ver,
						"types" : Data.Main[ver.toString()].Types,
				        "listofimmun" : Data.Main[ver].Listofimmun,
				        "weakmono" : Data.Main[ver].WeakMono,
				        "chart": Data.Main[ver].Chart
					};

					Game.numoconf = 4;	//type1, type2, immun, add
					Game.typesUp = [];
					Game.types.forEach(function(t){
						// var newup = t.char
						Game.typesUp.push ( (t[0].toUpperCase()+t.slice(1,t.length)) );
					});
					Game.wikitype = [];
					Game.types.forEach(function(t){
						var n = 0;
						for (var t2 in Data.WikiType){
							if (t == t2) {
								Game.wikitype.push(Data.WikiType[t]);
								// return true;
							}
							n++;
						}

					})

					Game.numofpoke = 6;
					Game.max = Game.types.length;
			        Game.total = Math.round(Game.max*Game.max/2);
			        Game.title = document.getElementById("chartver").selectedOptions[0].innerText;
					if (
						Game.title=="RSE" || Game.title=="DPPt"
						|| Game.title=="Gen 4" || Game.title=="HGSS"
					){
						Game.listofimmun.splice(Game.listofimmun.indexOf("grass"),Game.listofimmun.indexOf("grass")+1);
					} else if (
						Game.title=="GSC"
						|| Game.title=="Gen 1"
					){
						Game.listofimmun = [];
					}
			        if (document.getElementById("che_res"))
			        	Game.restriction = document.getElementById("che_res").checked;
			    	else Game.restriction = true;
			        // console.log(Game);	

			        if (Game.chartver==2||Game.chartver==3){
						// pre = ["6_5","16_16","15_18","10_4","2_3"];	//water/fight
						//pre = ["3_8","2_15","17_17","16_16","2_11"];	//grass/dark
						// pre = ["5_8","16_16","4_10","15_17"];	//rock/dark
						//pre = ["18_18"];//normal
						// pre = ["8_9"];
						// pre = ["5_5"];
					} else pre = [];

			        createtable();
			        reset(0); 
			        
			        fill(all,default_(1, Game.max));
			        if (pre.length>0){
			        	pre.forEach(function(p){
			        		selectcell(p);
			        	})
			        }

			        Game.wikitypesrc = [];
			        for (var i=1; i<=Game.types.length; i++){
			        	Game.wikitypesrc.push(document.getElementById("tr_0").children[i].children[0].src);
			        }

					Game.interface = {};
					Game.interface.first = 0;
					Game.interface.last = 3;

					Game.availables = {};
			        /*//$(function(){
			        	jQuery(document.body).ready(function(){
			        		$( "#embed" ).load( "src/Pokemon_dual-type_charts.html #dualtypechart", function(){
			        			naming();
			        		});
			        	})
			        //});*/

			        //coloring is broken
			        // document.getElementsByClassName("cell").children.forEach(function(e){
			        // 	e.style.backgroundColor = Data.Color.notok;
			        // });
			        //document.querySelector('.cell').style.backgroundColor = "#ff0000";
			        //getComputedStyle(document.querySelector('.cell')).setProperty('backgroundColor', "rgb(255, 0, 0)"); 
			    }
			};
			xmlhttp.open("GET", "./main.json", true);
			xmlhttp.send();
		}

		function sel_charver(){
			var ver = event.srcElement.value;
			// console.warn(ver);
			Game = {};
			
			all = [];
			allweak = [];
			remainings = [];
			Data = {};		
			Game.mon = [];
			// mon = Game.mon;

			begin(ver);
			
		}

		function freemode(q){
			var restriction_master;

			if (document.getElementById("che_res"))
				var q = document.getElementById("che_res").checked;
			else var q = true;
			
			restriction_master = Data.Main[Game.chartver].Restriction;	
		
			// if (document.getElementById("table_3"))
			// document.getElementById("table_3").parentElement.removeChild(document.getElementById("table_3"));

			if (q){
				redraw();

				var restriction = [];
				var a = 0;
				restriction_master.forEach(function(n){
					n[1].forEach(function(t){
						restriction.push(Number(Game.types.indexOf(n[0])+1) + "_" + Number(1 + Game.types.indexOf(t)));
						restriction.push(Number(Game.types.indexOf(t)+1) + "_" + Number(1 + Game.types.indexOf(n[0])));
					})
					a++;
				});

				var ver_ref;
				var unavpokemon = {};
				var newpokemon = {};
				var newtype = {};

				//set the default
				Data.Verlist.recap.forEach(function(tid){
					newtype[tid] = [];
					unavpokemon[tid] = [];
					newpokemon[tid] = [];

					if (Data.Conf[tid]){
						if (Data.Conf[tid].NewType){
							newtype[tid] = Data.Conf[tid].NewType;
						}
						if (Data.Conf[tid].UnavMon){
							unavpokemon[tid] = Data.Conf[tid].UnavMon;
						}
						if (Data.Conf[tid].NewMon){
							newpokemon[tid] = Data.Conf[tid].NewMon;
						}
					}
				})

				//some
					// console.log(newtype[2],newpokemon[4]);
				newtype["DPPt"] = newtype[2];
				newpokemon["DPPt"] = newpokemon[4];
				// console.log(newpokemon["DPPt"]);
				unavpokemon["HGSS"] = newpokemon[4];
				newtype["BDSP"] = newtype[3];
				unavpokemon["BDSP"] = newpokemon[6];
				newtype["SwSh"] = newtype[6];

				Data.Verlist.recap.forEach(function(tid){
					if (tid==Game.title){
						Game.unavpokemon = unavpokemon[tid]
						Game.newpokemon = newpokemon[tid];
						Game.newtype = newtype[tid];
					}
				})

				var gen_recap = [];
				var def_recap;
				var newtype_id;
				var cur_gen;
				//just some pointers
				var curver = document.getElementById("chartver").selectedOptions[0].innerText;
				if (Data.Verconf[curver]){
					ver_ref = Data.Verconf[curver].ver_ref;
					newtype_id = Data.Verconf[curver].newtype_id;
					gen_recap = Data.Verconf[curver].gen_recap;					
				} else {
					ver_ref = Game.chartver;
				}

				Data.Main[ver_ref].Restriction.forEach(function(tid){
					tid[1].forEach(function(t){
						restriction.push(Number(Game.types.indexOf(tid[0])+1) + "_" + Number(1 + Game.types.indexOf(t)));
						restriction.push(Number(Game.types.indexOf(t)+1) + "_" + Number(1 + Game.types.indexOf(tid[0])));

					})
					Game.types.forEach(function(t){
						if (newtype[newtype_id]) newtype[newtype_id].forEach(function(nt){
							if (t==nt){
								restriction.push(Number(Game.types.indexOf(tid[0])+1) + "_" + Number(1 + Game.types.indexOf(t)));
								restriction.push(Number(Game.types.indexOf(t)+1) + "_" + Number(1 + Game.types.indexOf(tid[0])));
							}
						});
					});
				});	
				// console.log(ver_ref)

				// console.log(unavpokemon)
				// gen_recap.forEach(function(gen){
					if (unavpokemon[newtype_id]) unavpokemon[newtype_id].forEach(function(np){
						np[1].forEach(function(nt){
							// console.log(np[0],nt,"-->",1+Game.types.indexOf(np[0]),1+Game.types.indexOf(nt));
							restriction.push((Number(1+Game.types.indexOf(np[0])))+"_"+(Number(1+Game.types.indexOf(nt))));
							restriction.push((Number(1+Game.types.indexOf(nt)))+"_"+(Number(1+Game.types.indexOf(np[0]))));
						})
					});
				// });
				gen_recap.sort().forEach(function(id){
					if (newpokemon[id]) newpokemon[id].forEach(function(np){
						np[1].forEach(function(t2){
							var t_1 = 1+Game.types.indexOf(np[0]);
							var t_2 = 1+Game.types.indexOf(t2);
							while(restriction.indexOf(t_1+"_"+t_2)>-1){
								restriction.splice(restriction.indexOf(t_1+"_"+t_2),1);
							}
							while(restriction.indexOf(t_2+"_"+t_1)>-1){
								restriction.splice(restriction.indexOf(t_2+"_"+t_1),1);
							}
						})
					})
				});
				
				//other unav ones
				["DPPt", "HGSS", "B2W2"].forEach(function(serie){
					if (serie==Game.title){
						if (unavpokemon[serie]) unavpokemon[serie].forEach(function(np){
							np[1].forEach(function(nt){
								// console.log(np[0],nt,"-->",1+Game.types.indexOf(np[0]),1+Game.types.indexOf(nt));
								restriction.push((Number(1+Game.types.indexOf(np[0])))+"_"+(Number(1+Game.types.indexOf(nt))));
								restriction.push((Number(1+Game.types.indexOf(nt)))+"_"+(Number(1+Game.types.indexOf(np[0]))));
							})
						});
					}
				})

				// console.log(restriction);
				if (q) detailing();

				restriction.forEach(function(r){
					if (document.getElementById("tbl_"+r)){
						document.getElementById("tbl_"+r).style.backgroundColor = "#000000";
						document.getElementById("tbl_"+r).disabled = true;
					}
					// document.getElementById("tbl_"+r).innerText = "X";
				});
			} else {
				redraw();
			}
		}

		function reset(p,num){
			var mon = Game.mon;
			
			if (p==0){
				document.getElementById("monnum").innerText = 0;
				
				if (document.getElementById("table_3"))
					document.getElementById("table_3").innerHTML = "Weakness: ";
				if (document.getElementById("table_4a"))
					document.getElementById("table_4a").innerHTML = "";
				if (document.getElementById("table_4b"))
					document.getElementById("table_4b").innerHTML = "";
				// reset("abilities");	
				
				Game.slot = [];
				Game.slot_ = [];
				Game.slot__ = [];				
				Game.names = [];
				reset("avail");
				
				Game.mon = [];
				all = [];
				allweak = [];
				fill(all,default_(1, Game.max));
				
				reset("main");	
				freemode();	
				reset("safe");

				// console.clear();
			} 
			/*else if (p=="abilities"){
				if (!num){
					for (var i=1; i<Game.numofpoke+1; i++){
						document.getElementById("imun_sel_"+i).children[0].innerText = ".";
						
						var j = 1; 
						Game.listofimmun.forEach(function(im){
							if (document.getElementById("imun_sel_"+i).children[j])
								document.getElementById("imun_sel_"+i).children[j].innerText = "anti-"+(im);
							j++;
						})
					}
				} else {
					console.warn(999999);
				}

			} */
			else if (p=="main"){
				for (var a=1; a<Game.numofpoke+1; a++){
					for (var b=1; b<2+1; b++){
						if (document.getElementById("mon"+a+"_t"+b))
						document.getElementById("mon"+a+"_t"+b).innerText = "";
					}
					["imun_sel_"+a,"confplus_sel_"+a].forEach(function(conf){
						if (document.getElementById(conf)){
							document.getElementById(conf).value = "";
							document.getElementById(conf).disabled = true;
							document.getElementById(conf).style.width = Data.Univ.Width + "px";
						}
					})
					while(document.getElementById("confplus_"+a).children.length>1)
					// if (document.getElementById("confplus_"+a).children.length>1)
						document.getElementById("confplus_"+a).removeChild(document.getElementById("confplus_"+a).children[1]);

					// console.warn(mon.length);
					while(document.getElementById("con"+a).children.length>1)
						document.getElementById("con"+a).removeChild(document.getElementById("con"+a).children[0]);
				}

				for (var a=0; a<Game.max; a++){
					for (var b=0; b<Game.max; b++){
						if (document.getElementById("tbl_"+Number(a+1)+"_"+Number(b+1))
						){
							document.getElementById("tbl_"+Number(a+1)+"_"+Number(b+1)).innerText = 1;
							document.getElementById("tbl_"+Number(a+1)+"_"+Number(b+1)).style.backgroundColor = Data.Color.ok;

						}
						if (document.getElementById("tbl_"+Number(b+1)+"_"+Number(a+1))
						){
							document.getElementById("tbl_"+Number(b+1)+"_"+Number(a+1)).innerText = 1;
							document.getElementById("tbl_"+Number(b+1)+"_"+Number(a+1)).style.backgroundColor = Data.Color.ok;

						}
					}		
				}

				// freemode();
			} else if (p=="del"){
				reset("main");
				var x=1;
				// console.log("num",num,Game.slot__.length-1);
				reset("avail",num);
				mon.forEach(function(m){
					document.getElementById("mon"+x+"_t1").innerText = m.type1;
					document.getElementById("mon"+x+"_t2").innerText = Game.types[Game.types.indexOf(m.type2)];
					
					document.getElementById("imun_sel_"+x).value = m.immun;
					document.getElementById("imun_sel_"+x).disabled = false;

					if (document.getElementById("avail_sel_"+x))
						document.getElementById("avail_sel_"+x).value = m.name;
					// console.log(Game.slot__);

					// console.log(111111);
					if (m.type3){
						var type3id_list = Data.Univ.Type3s;
						// console.log("bababab",m.type3);

						document.getElementById("confplus_sel_"+x).value = "type3-"+(Number(1+type3id_list.indexOf(m.type3)));//m.type3;
					
					}

					if (Game.chartver=='3' || Game.chartver=='9'){
						// document.getElementById("confplus_"+x).innerHTML = "";
						document.getElementById("confplus_sel_"+x).disabled = false;
						if (document.getElementById("confplus_sel_"+x).value!=""){
							document.getElementById("confplus_"+x).appendChild(document.createElement("img")).outerHTML = "<br><img width="+Data.Univ.Width+" src='https://serebii.net/pokedex-bw/type/"+m.type3+".gif' alt='"+m.type3+"'>";				
							document.getElementById("confplus_"+x).style.width = "0px";
							// document.getElementById("confplus_sel_"+x).style.width = Data.Univ.Width + "px";
						}
					}

					// document.getElementById("con"+x).innerHTML = "";
					x++;

					if (
						document.getElementById("tbl_"+Number(Game.types.indexOf(m.type2)+1)+"_"+Number(Game.types.indexOf(m.type1)+1))
					){
						document.getElementById("tbl_"+Number(Game.types.indexOf(m.type2)+1)+"_"+Number(Game.types.indexOf(m.type1)+1)).innerText = 0;
						document.getElementById("tbl_"+Number(Game.types.indexOf(m.type2)+1)+"_"+Number(Game.types.indexOf(m.type1)+1)).style.backgroundColor = Data.Color.notok;

					}

					if(
						document.getElementById("tbl_"+Number(Game.types.indexOf(m.type1)+1)+"_"+Number(Game.types.indexOf(m.type2)+1))
						){
						document.getElementById("tbl_"+Number(Game.types.indexOf(m.type1)+1)+"_"+Number(Game.types.indexOf(m.type2)+1)).innerText = 0;
						document.getElementById("tbl_"+Number(Game.types.indexOf(m.type1)+1)+"_"+Number(Game.types.indexOf(m.type2)+1)).style.backgroundColor = Data.Color.notok;

					}
				});
				// console.error(num);
			} else if (p=="all"){
				fill(all,default_(1, Game.max));
				for (var i=0; i<mon.length; i++){
					var x=0;
					all.forEach(function(k){
						var y=0;
						k.forEach(function(){
							all[x][y] *= mon[i].subtotal[x][y];
							y++;
						});
						x++;
					});
				}
				reset("avail");
			} else if (p=="safe"){
				document.getElementById("table_4").innerHTML = "Safe against : ";
				remainings = [];
				// console.warn(allweak);
				if (Game.types.length>allweak.length){
					var g = 0;
					Game.types.forEach(function(a){
							if (g==0) {
								Game.types.forEach(function(i){
									if (allweak.indexOf(i)<0){
										if (i!="normal"){
											document.getElementById("table_4").innerHTML += "<a onclick='findmon_onlyweakto("+Game.types.indexOf(i)+")' href='#'>"+i +"</a>? ";
											remainings.push(i);
										}
									}
								});
							}
						/* else {

							Game.listofimmun.forEach(function(i){
								if (i==a){
									document.getElementById("table_4").innerHTML += "<a onclick='findmon_onlyweakto("+Game.types.indexOf(a)+")' href='#'>"+a +"</a>? ";
								} 
							}) 
						}*/
						g++;
					})
					
					//eelektross etc
					document.getElementById("table_4").innerHTML += "<a href='#' onclick='findmon_onlyweakto(99)'>nothing</a>?"
				}

				// reset("avail");
			} else if (p=="avail"){
				var mon = Game.mon;
				for (var w=1;w<Game.numofpoke+1; w++){
					// if (Game.slot__ && Game.slot__) console.warn(Game.slot__[w].length);
					if (event && event.srcElement && event.srcElement.id){
						if (event.srcElement.id=="resets"){
							if (document.getElementById("avail_sel_"+w))
							document.getElementById("avail_sel_"+w).innerHTML = "<option value></option>";

						} else if (event.srcElement.id.split("_")[0]=="imun"){
							// console.log(event.srcElement.id.split("_")[0])
						} else if (event.srcElement.id.split("_")[0]=="confplus"){
							// console.log(event.srcElement.id.split("_")[0])
						} else if (event.srcElement.id.split("_")[0]=="del"){
							// console.log(w,num,Game.slot__);
							if (document.getElementById("avail_sel_"+w)){
								document.getElementById("avail_sel_"+w).innerHTML = "<option value></option>";

								if (document.getElementById("avail_sel_"+w).children.length-1 == 0){
									if (Game.slot__[w]) Game.slot__[w].forEach(function(s){
										document.getElementById("avail_sel_"+w).innerHTML += "<option value="+s+">"+s+"</option>"
									})
								}
							}
						} else if (event.srcElement.id.split("_")[0]=="tbl"){
							// document.getElementById("avail_sel_"+w).innerHTML = "<option value></option>";
						} else {
							// console.log(event.srcElement.id.split("_")[0])
						}
					}					

					//default, retrieved from local html
					/*if(document.getElementById("avail_"+w)){
						document.getElementById("avail_"+w).innerText = "";
						document.getElementById("avail_"+w).style.backgroundColor = "#ffffff";
					}*/
				}

				// console.error(Game.slot__.length-1);
				var q = 1;
				if (!Game.names) Game.names = [];
				if (mon) mon.forEach(function(m){
					if (Game && Game.names[q]) {
						// document.getElementById("avail_sel_"+q).value = Game.names[q];
						sel_mon(q);
						// console.warn(Game.names, q);
					}
					q++;
				})
			}
		}

		function findmon_onlyweakto(t,firstlayer,res,monow){
			var result = [], result2 = [], resultsingle = [], result2single = [];
			// console.log(t,firstlayer,res,monow);

			if (350!=Number((document.getElementById("folddiv").style.height).slice(0,(document.getElementById("folddiv").style.height.length)-2)))
				document.getElementById("folddiv").style.height = "350px";
			if (!firstlayer){
				Game.types.forEach(function(x){
					Game.types.forEach(function(y){	
						var temp = maketemp(x,y);
						weakrecap(temp);
						if (temp.weakto.length==1){
							if (t==99){
								Game.listofimmun.forEach(function(i){
									if (i==temp.weakto[0]){
										resultsingle.push([x,y].sort());
									}
								});
							} else {
								if(temp.weakto[0]==Game.types[t]){
									resultsingle.push([x,y].sort());
								}
							}
						} else if (temp.weakto.length>1){
							if (temp.weakto.indexOf(Game.types[t])<0) 
								return false;

							result.push([x,y].sort());
						}
					});
				});	

				if (result) {
					result.sort();
					// console.warn(123,result);			
					var n = 0;
					result.forEach(function(r1){
						if (n>0){							
							if(!((r1[0]==result[n-1][0])&&(r1[1]==result[n-1][1]))){
								result2.push(r1);								
							}							
						} else {
							result2.push(r1);							
						}
						n++;
					});
					// console.warn(456,result2);
					findmon_onlyweakto(t,true,result2,false);
				} 

				if (resultsingle) {
					resultsingle.sort();
					if (t==99){		
						var c = 0;
						var finished = false;

						function deldup(b,d){
							resultsingle.sort();
							var c = b-1;
							if (resultsingle[b] && resultsingle[c]){
								if ((resultsingle[b][0]==resultsingle[c][0]) && (resultsingle[b][1]==resultsingle[c][1])){
									resultsingle.pop();
									
									if ((resultsingle[d][0]==resultsingle[d+1][0]) && (resultsingle[d][1]==resultsingle[d+1][1])){
										console.log("shift",d);
										finished |= false;
										resultsingle.shift();
									} else finished |= true;
								}
							}
						}

						//sorting/filtering is broken i giv up
						/*for (var u=1; u<resultsingle.length-1; u++){
							if (!finished) {
								deldup(resultsingle.length-1-u,u-1);
							}

							var e=0
							if (u==resultsingle.length-1-1){
								for (var i=0; i<resultsingle.length-1; i++){
									if ((resultsingle[i][0]==resultsingle[i+1][0]) && (resultsingle[i][1]==resultsingle[i+1][1])){
										
										resultsingle.splice(i,1);
									}
								}
							}
						}*/

						resultsingle.forEach(function(r3){
							var temp5 = maketemp(r3[0],r3[1]);
							Game.listofimmun.forEach(function(i){
								temp5.immun = "anti-"+i;
								weakrecap(temp5);
								var found = true;

								temp5.weakto.forEach(function(wt){
									found = false;
								});

								if (found){
									temp5.weakto.sort();
									document.getElementById("table_4b").innerHTML += "<a href='#' onclick='selectcell(`"+Number(Game.types.indexOf(r3[0]) + 1)+"_"+Number(Game.types.indexOf(r3[1]) + 1)+"`, "+Game.types.indexOf(i)+")'>"+r3[0]+"/"+r3[1]+"</a>(anti-"+i+"),,,,,,, ";
								}
							});
							c++;
						});
					} else {
						var n = 0;
						resultsingle.forEach(function(r1){
							if (n>0){							
								if(!((r1[0]==resultsingle[n-1][0])&&(r1[1]==result[n-1][1]))){
									result2single.push(r1);								
								}							
							}
							n++;
						});
						findmon_onlyweakto(t,true,result2single,true);						
					}
				}
			} else {
				// console.warn(789,res);
				res.forEach(function(x){
					var temp = maketemp(x[0],x[1]);
					weakrecap(temp);
					//console.error(temp.weakto);

					if (temp.weakto.length==1){
						result2single.push([x[0],x[1]].sort());
					}
					else if (temp.weakto.length>1){
						// if (temp.weakto.indexOf(allweak[t])>=0) 
						// 	return false;
						// console.error(monow);

						if (!monow) {
							if (Game.listofimmun.indexOf(event.srcElement.innerText) <0){
								return [];
							}
							var temp2 = maketemp(x[0],x[1]);
							weakrecap(temp2);
							// console.error(temp2.weakto);
							var q = 0;
							if (allweak.length>0) {
								allweak.forEach(function(w){
									if(temp2.weakto.indexOf(w)>=0){
										
									} else {
										if (q==0) {
											result2.push([x[0],x[1]].sort());
										}
									}
									q++;
								});								
							} else {
								result2.push([x[0],x[1]].sort());
							}
						}
					} else console.error(123456);
				});
				reset("safe");

				if (result2 && !monow){
					if (!document.getElementById("table_4b")) document.getElementById("table_4").parentElement.parentElement.appendChild(document.createElement('tr')).appendChild(document.createElement('td')).id="table_4b";
					result2.sort();
					if (Game.total==0){
						document.getElementById("table_4b").innerHTML = "Potential"+" recruits : ";
						
						result2.forEach(function(r2){
							var temp4 = maketemp(r2[0],r2[1]);
							weakrecap(temp4);
							temp4.weakto.sort();

							var c = 0;
							Game.listofimmun.forEach(function(i){
								temp4.immun = "anti-"+i;
								weakrecap(temp4);
								var found = true;

								temp4.weakto.forEach(function(wt){
									if (remainings.indexOf(wt)<0){
										found *= false;
									}
								});

								if (found){
									temp4.weakto.sort();
									document.getElementById("table_4b").innerHTML += "<a href='#' onclick='selectcell(`"+Number(Game.types.indexOf(r2[0]) + 1)+"_"+Number(Game.types.indexOf(r2[1]) + 1)+"`, "+Game.types.indexOf(i)+")'>"+r2[0]+"/"+r2[1]+"</a>(anti-"+i+"),,,,,,, ";								
								}
							});
						});
					} else {
						var modifmon=[];
						result2.forEach(function(r2){
							//@
							Game.listofimmun.forEach(function(im){
								// if (im==Game.types[t]){

									var temp7 = maketemp(r2[0],r2[1],"anti-"+im);
									weakrecap(temp7);
									// console.warn(r2[0],r2[1],"anti-"+im,temp7.weakto)
									if (temp7.weakto.length>1) {
											temp7.weakto.forEach(function(wt){
											if(allweak.indexOf(wt)<0){
												//let it be
												// modifmon.push([r2[0],r2[1],"anti-"+im]);
											}
										})
									} else if (temp7.weakto.length==1 && temp7.weakto[0]==Game.types[t]){
										// console.error(r2[0],r2[1],"anti-"+im,temp7.weakto)
										result2single.push([r2[0],r2[1],Game.types.indexOf(im)]);
									}
							});
							var type3id_list = [1,2];
							type3id_list.forEach(function(t3){
								//type3-1...
								//$
								r2[2] = Data.Univ.Type3s[t3-1];
								var temp8 = maketemp(r2[0],r2[1],undefined,r2[2]);

								var t3arr = [];
								Game.types.forEach(function(t){
									if (!t3) t3arr[Game.types.indexOf(t)] = 1;
									else t3arr[Game.types.indexOf(t)] = -99;//(Game.chart[Game.types.indexOf(t3)][Game.types.indexOf(t)]);				
								});
								temp8.weakrecap.Matrices[2] = t3arr;
								if (!t3 && temp8.weakrecap.Matrices.length>2) {
									temp8.weakrecap.Matrices.pop();
								}

								weakrecap(temp8);
								if (temp8.weakto.length==1 && temp8.weakto[0]==Game.types[t]){
									result2single.push([r2[0],r2[1],undefined,r2[2]]);
									//@
									// console.warn(r2[0],r2[1],"+",r2[2],temp8.weakto);
								} else {
									Game.listofimmun.forEach(function(im){
										temp8.immun = im;
										weakrecap(temp8);
										// console.warn(r2[0],r2[1],"anti-"+im,temp7.weakto)
										if (temp8.weakto.length>1) {
												temp8.weakto.forEach(function(wt){
												if(allweak.indexOf(wt)<0){
													//let it be
												}
											})
										} else if (temp8.weakto.length==1 && temp8.weakto[0]==Game.types[t]){
											result2single.push([r2[0],r2[1],Game.types.indexOf(im)]);
										}
											// console.error(r2[0],r2[1],r2[2],"anti-"+im,temp8.weakto)
									});
									// console.error(temp8);
								}
							})
							// temp7.weakto.sort();
							// console.error(temp7.weakto.length);
						})
						// console.error(modifmon);

						//findmon_onlyweakto(t,true,result2single,true);
						Game.bonusteam = result2single;
						// console.warn(monow,result2single);
						document.getElementById("table_4b").innerHTML = "Anti-"+Game.types[t]+" immmunities : ";//+result2.length;
						result2.forEach(function(r2){
							var t1 = 1 + Game.types.indexOf(r2[0]);
							var t2 = 1 + Game.types.indexOf(r2[1]);
							var id = "tbl_" + t1 + "_" + t2;
							if (document.getElementById(id) 
								&& document.getElementById(id).innerText!="0" 
								&& document.getElementById(id).style.backgroundColor!="rgb(0, 0, 0)"
								// && Game.chartver==2 && (Game.title=="RSE" || Game.title=="DPPt")
								// && r2[2] && r2[2]!="anti-grass"
							)
									// console.error(r2[0], r2[1])
								document.getElementById("table_4b").innerHTML += "<a href='#' onclick='selectcell(`"+Number(Game.types.indexOf(r2[0]) + 1)+"_"+Number(Game.types.indexOf(r2[1]) + 1)+"`, "+t+")'>"+r2[0]+"/"+r2[1]+"</a>,,,,,,, ";
						});

					}
				} 
				if(result2single && monow) {
					if (!document.getElementById("table_4a")) document.getElementById("table_4").parentElement.parentElement.appendChild(document.createElement('tr')).appendChild(document.createElement('td')).id="table_4a";	
					result2single.sort();
					
					// document.getElementById("table_4").appendChild(document.createElement('tr')).appendChild(document.createElement('td')).innerText = "-------";
					
					if (Game.total==0 || Game.listofimmun.indexOf(Game.types[t])<0){
						for (var a=0; a<Game.max; a++){
							if(Game.weakmono[Game.types[a]].length==2){
								var temp3 = maketemp(Game.types[a],Game.types[a]);
								weakrecap(temp3);
								temp3.weakto.sort();
								var idw;
								if (temp3.weakto.indexOf(Game.types[t])<0) {}
								else {
									var found = false;
									Game.listofimmun.forEach(function(i){
										if (temp3.weakto.indexOf(i)>=0){
											found |= true;
										}
									});
									if (found){
										result2single.push([Game.types[a], Game.types[a]]);
										idw = Game.types.indexOf(temp3.weakto[temp3.weakto.length-temp3.weakto.indexOf(Game.types[t])-1]);
										/*console.log(Game.types[a], temp3.weakto, Game.types[t], found, 
											temp3.weakto.length-temp3.weakto.indexOf(Game.types[t])-1,
											temp3.weakto[temp3.weakto.length-temp3.weakto.indexOf(Game.types[t])-1],
											Game.types.indexOf(temp3.weakto[temp3.weakto.length-temp3.weakto.indexOf(Game.types[t])-1])
											);		*/
									}
								}
							}
						}
						document.getElementById("table_4a").innerHTML = "Weak only to "+Game.types[t]+" : ";//+result2.length;
						result2single.forEach(function(r1){
							document.getElementById("table_4a").innerHTML += "<a href='#' onclick='selectcell(`"+Number(Game.types.indexOf(r1[0]) + 1)+"_"+Number(Game.types.indexOf(r1[1]) + 1)+"`"+","+idw+")'>"+r1[0]+"/"+r1[1]+"</a>,,,,,,, ";
						});
					} else {
						document.getElementById("table_4a").innerHTML = "Weak only to "+Game.types[t]+" : ";//+result2.length;
						result2single.forEach(function(r1){
							document.getElementById("table_4a").innerHTML += "<a href='#' onclick='selectcell(`"+Number(Game.types.indexOf(r1[0]) + 1)+"_"+Number(Game.types.indexOf(r1[1]) + 1)+"`"+")'>"+r1[0]+"/"+r1[1]+"</a>,,,,,,, ";
						});
						if(Game.bonusteam) Game.bonusteam.forEach(function(r1){
							if (r1[2] && !r1[3]){

								document.getElementById("table_4a").innerHTML += "<a href='#' onclick='selectcell(`"+Number(Game.types.indexOf(r1[0]) + 1)+"_"+Number(Game.types.indexOf(r1[1]) + 1)+"`"+",`"+r1[2]+"`)'>"+r1[0]+"/"+r1[1]+"</a>(anti-"+Game.types[r1[2]]+"),,,,,,, ";
							} else if (!r1[2] && r1[3]){
								document.getElementById("table_4a").innerHTML += "<a href='#' onclick='selectcell(`"+Number(Game.types.indexOf(r1[0]) + 1)+"_"+Number(Game.types.indexOf(r1[1]) + 1)+"`"+","+undefined+",`"+r1[3]+"`)'>"+r1[0]+"/"+r1[1]+"</a>(/"+r1[3]+"),,,,,,, ";
								// console.log(r1[3]);

							} else {
								// console.error("err")
							}
						});
						
					}
				} 
				/*else if (result2single && !monow){
					if (!document.getElementById("table_4a")) document.getElementById("table_4").parentElement.parentElement.appendChild(document.createElement('tr')).appendChild(document.createElement('td')).id="table_4a";	
					result2single.forEach(function(r1){
						console.log("ini",r1)
						document.getElementById("table_4a").innerHTML += "<b>"+r1[1]+"</b>";
						//document.getElementById("table_4a").innerHTML += "<a href='#' onclick='selectcell(`"+Number(Game.types.indexOf(r1[0]) + 1)+"_"+Number(Game.types.indexOf(r1[1]) + 1)+"`"+")'>"+r1[0]+"/"+r1[1]+"</a>(),,,,,,, ";
					});
				}*/
			}	

			if (document.getElementById("table_4b"))
			document.getElementById("table_4b").style.maxHeight = "0px";		
		}
		
		function recalculate(ord,num){
			var mon = Game.mon;
			if (mon.length == 0 && mon.length == 0) {
			} else {
				if (ord=="del"){
					if (!mon[num])
						return false;

					// Game.names = [];
					// var q = 1;
					// mon.forEach(function(m){
					// 	// if (m) Game.names[q] = (m.name);//console.error(m.name);
					// 	q++;
					// })

					for (var a=0; a<mon.length; a++){
						if (a==num){
							mon[a] = false;
						}
					}
					mon.sort();
					mon.pop(-1);

					// reset("abilities",num);	

					Game.slot__.splice(num+1,1);
					Game.names.splice(num+1,1);
					reset("del",num+1);

					if (mon.length<1){
						reset(0);
					}
					recalculate("all");

				} else if(ord=="all"){				
					all = [];
					fill(all,default_(1, Game.max));
					
					if (mon.length>0) {
						mon.forEach(function(m){
						if (m.subtotal){
							var a=0;
							all.forEach(function(k){
								var b=0;
								k.forEach(function(){
									all[a][b] *= m.subtotal[a][b];
									b++;
								});
								a++;
							});
						}
						});

					} else console.warn(123321);



					allweak = [];
					if (document.getElementById("table_3")) document.getElementById("table_3").innerHTML = "Weakness: ";
					recalculate("allweak");
					if(document.getElementById("table_4a")) document.getElementById("table_4a").innerHTML = "";
					if(document.getElementById("table_4b")) document.getElementById("table_4b").innerHTML = "";
				} else if(ord=="allweak"){	
					allweak = [];
					if (mon.length>0) mon.forEach(function(m){
						if (m.weakto.length>0) 
						m.weakto.forEach(function(mw){
							if (allweak.indexOf(mw)<0){
								allweak.push(mw);
							}
						})
					})
					// allweak.sort();

					if (document.getElementById("table_3")){
						document.getElementById("table_3").innerHTML = "Weakness: ";
						if (allweak.length>0) allweak.forEach(function(aw){
							document.getElementById("table_3").innerHTML += aw + ", ";
						})
					}
				}
			}

			reset("safe");			
			
			gametotal();

			redraw();
			freemode();			

			avail_check(mon);
			recolorchosen(mon);

			//moncount
			document.getElementById("monnum").innerText = String(mon.length + "/" + Number(document.getElementById("tr2_0").children.length-1));

			// Game.allWeakto = document.getElementById("table_3").innerText.split("Weakness: ")[1].split(", ");

		}

		function imunis(a){
			var mon = Game.mon;
			if (mon[a-1]){
				mon[a-1].immun = document.getElementById("imun_sel_"+a).value;
				weakrecap(mon[a-1]);

				subtotal(a-1);

				//%
				reset("all");
				for (var i=0; i<mon.length; i++){
					var x=0;
					all.forEach(function(k){
						var y=0;
						k.forEach(function(){
							all[x][y] *= mon[i].subtotal[x][y];
							y++;
						});
						x++;
					});
				}

				redraw();

				allweak = [];
				if (document.getElementById("table_3")) document.getElementById("table_3").innerHTML = "Weakness: ";
				recalculate("allweak");
			}
		}

		function sel_mon(id){
			var mon = Game.mon;
			var now;
			if (id){
				// console.warn("abc", mon[now-1].name);
				now = id;
				getPokemonData(["image", mon[now-1].name, now]);
				Game.names[now] = mon[now-1].name;
			} else {
				// console.warn(123);
				var mon = Game.mon;
				if (event && event.srcElement){
					now = (Number(event.srcElement.id.split("_")[1]) || Number(event.srcElement.id.split("_")[2]));
					// console.warn(now,mon[0].name);
					// document.getElementById("avail_sel_"+now).value = "charizard";
					if (document.getElementById("avail_sel_"+now) && document.getElementById("avail_sel_"+now).selectedOptions[0]){
						if (mon[now-1]) {
							Game.names[now] = mon[now-1].name = document.getElementById("avail_sel_"+now).selectedOptions[0].value;
							// console.log(Game.names[now],mon[now-1].name)
							// document.getElementById("avail_sel_"+now).value = Game.names[now];
							getPokemonData(["ability", document.getElementById("avail_sel_"+now).selectedOptions[0].value, now]);
							getPokemonData(["image", mon[now-1].name, now]);
						}						
					} 
					// document.getElementById("avail_sel_"+now).value = "charizard";
				}
			}

			// console.log(event.srcElement.id.split("_")[2], mon[Number(-1+event.srcElement.id.split("_")[2])]);
		}

		function swapleft(){
			var from_id = Number(event.srcElement.id.split("_")[1]);
			var to_id = Number(from_id) - 1
			// console.log(from_id,"->", to_id);
			var from_t = Game.types[from_id-1];
			var to_t = Game.types[to_id-1];
			// console.log(Game.types[from_id-1],"->", Game.types[to_id-1]);
			// console.log(Game.types[to_id-1],"->", Game.types[from_id-1]);

			var n = 0;
			var new_list = [];
			Game.types.forEach(function(){
				new_list[n] = "";
				n++;
			})

			function fillnewlist(l, from, to){
				var new_list = [];
				var temp_t = '';
				var temp_t2 = '';
				temp_t = lists[a][from-1];
				temp_t2 = lists[a][to-1];
				new_list[to-1] = lists[a][from-1];
				new_list[from-1] = lists[a][to_id-1];
				for (var e=0; e<Game.max; e++){
					if (e!=to-1 && e!=from-1){
						new_list[e] = lists[a][e];
					}
				}
				if (l==Game.types){
					Game.types = new_list;
				} else if (l==Game.typesUp){
					Game.typesUp = new_list;
				} else if (l==Game.wikitype){
					Game.wikitype = new_list;
				}
			}
			var lists = [Game.types, Game.typesUp, Game.wikitype];
			for (var a=0; a<lists.length; a++){
				fillnewlist(lists[a], from_id, to_id);
			}

			createtable();

			//charts
			var new_chart = [];
			Game.types.forEach(function(t1){
				Game.types.forEach(function(t2){
					if (t1==from_t || t2==from_t || t1==to_t || t2==to_t){
						if (!new_chart[Game.types.indexOf(t1)]) new_chart[Game.types.indexOf(t1)] = [];
						new_chart[Game.types.indexOf(t1)][Game.types.indexOf(t2)] = Data.Main[Game.chartver].Chart[Data.Main[Game.chartver].Types.indexOf(t1)][Data.Main[Game.chartver].Types.indexOf(t2)];
					} else {
						if (!new_chart[Game.types.indexOf(t1)]) new_chart[Game.types.indexOf(t1)] = [];
						new_chart[Game.types.indexOf(t1)][Game.types.indexOf(t2)] = Data.Main[Game.chartver].Chart[Game.types.indexOf(t1)][Game.types.indexOf(t2)];
					}					
				})
			});
			Game.chart = new_chart;

			//ids
			var newlistofids = [];
			var a = 0;
			Game.mon.forEach(function(m){
				m.id = (Number(1+Game.types.indexOf(m.type1))) + "_" + (Number(1+Game.types.indexOf(m.type2)));				
				newlistofids.push(m.id);
				// weakrecap(Game.mon[a]);
				// subtotal(a);
				// a++;
			});

			//for redoing maketemp
			// reset("all");
			// reset("safe");

			// reset("main");
			reset(0);

			freemode();
			newlistofids.forEach(function(id){
				document.getElementById("tbl_"+id).click();
			});
		}


		function nextchain(){
			if (Game.interface.first<19){
				Game.interface.first++;
				Game.interface.last++;
				
				document.getElementById("menu_2").click();
			} else {
				Game.interface.first = 0;
				Game.interface.last = 3

				document.getElementById("menu_2").click();
			}
		}

		function sel_numoweak(){
			var sel = event.srcElement.selectedOptions[0].value;
			// console.log(sel, Game.availables[sel].length);
			document.getElementById("divexp").innerHTML = "<br>These are available with ";
			document.getElementById("divexp").innerHTML += "<select id='sel_avb' onchange='sel_numoweak()'><option disabled=''>?</option><option value='0'>0</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option></select>";
			document.getElementById("divexp").innerHTML += " weakness(es) :"


			if (Game.availables[sel]) Game.availables[sel].forEach(function(avb){
				if (avb[0] && avb[1] && avb[3])
					document.getElementById("divexp").innerHTML += "<li> <a href='#' onclick='selectcell(`"+(1+Game.types.indexOf(avb[0]))+"_"+(1+Game.types.indexOf(avb[1]))+"`,`"+ (Game.types.indexOf((avb[2]||"").split("anti-")[1])) +"`, `"+avb[3]+"`)'>"+ "<img width=16 src='"+Game.wikitypesrc[Game.types.indexOf(avb[0])]+"'>" +"+"+ "<img width=16 src='"+Game.wikitypesrc[Game.types.indexOf(avb[1])]+"'>" +"*"+ (avb[2]||"") + " "+ ("<img width=16 src='"+Game.wikitypesrc[Game.types.indexOf(avb[3])]+"'>"||"") + "</a>" +"</li>";				
				else if (!avb[3])
					document.getElementById("divexp").innerHTML += "<li> <a href='#' onclick='selectcell(`"+(1+Game.types.indexOf(avb[0]))+"_"+(1+Game.types.indexOf(avb[1]))+"`,`"+ (Game.types.indexOf((avb[2]||"").split("anti-")[1])) +"`, `"+"`)'>"+ "<img width=16 src='"+Game.wikitypesrc[Game.types.indexOf(avb[0])]+"'>" +"+"+ "<img width=16 src='"+Game.wikitypesrc[Game.types.indexOf(avb[1])]+"'>" +"*"+ (avb[2]||"") + " "+ ("") + "</a>" +"</li>";
			})		
			document.getElementById("sel_avb").value = String(sel);

			var arr_todel = [];
			if (Game.availables && JSON.stringify(Game.availables)!="{}"){
				for (var i=0; i<11; i++){
					if (!Game.availables[i]){
						arr_todel.push(i);
					}
				}
			}

			arr_todel.forEach(function(id){
				// console.error(document.getElementById("sel_avb").children.length)
				for (var i=0; i<document.getElementById("sel_avb").children.length; i++){
					// console.log(id, document.getElementById("sel_avb").children[i].innerText)
					if (id == Number(document.getElementById("sel_avb").children[i].innerText)){
						document.getElementById("sel_avb").removeChild(document.getElementById("sel_avb").children[i])
					}
				}
			})
		}

		function newtype(){
			var value = event.srcElement.innerText;
			if (value=="save"){
				// console.error("save")
				if (document.getElementById("newtypename").value.trim()==""){
					alert("Fill the name please");
					document.getElementById("newtypename").focus();
					return false;
				}

				if (confirm("Are you sure?")){
					var newname = document.getElementById("newtypename").value;


					var newarr_att = [];
					Game.types.forEach(function(){
						newarr_att.push(0);
					});
					newarr_att.push(0);
					var newarr_def = [];
					Game.types.forEach(function(){
						newarr_def.push(0);
					});
					newarr_def.push(0);

					Game.types.push(newname);
					Game.typesUp.push ( (newname[0].toUpperCase()+newname.slice(1,newname.length)) );
					Game.wikitype.push("");
					Game.wikitypesrc.push("src/nuevotipo.png");

					// console.log("oklah", newname, newarr_att)
					for (var i=0; i<newarr_att.length; i++){
						/*if (i==newarr_att.length-1){
							newarr_att[i] = document.getElementById("newtype_att_x").innerText.split("(")[1];
							newarr_att[i] = newarr_att[i].slice(0,-1);
						} else {
							newarr_att[i] = document.getElementById("newtype_att_"+i).innerText.split("(")[1];
							newarr_att[i] = newarr_att[i].slice(0,-1);
						}*/
						newarr_att[i] = 0;

						if (Game.chart[i])
							Game.chart[i].push(Number(newarr_att[i]));
					}
					Game.chart.push([]);

					if (!Game.weakmono[newname]) Game.weakmono[newname] = [];

					for (var i=0; i<newarr_def.length; i++){
						/*if (i==newarr_def.length-1){
							newarr_def[i] = document.getElementById("newtype_def_x").innerText.split("(")[1];
							newarr_def[i] = newarr_def[i].slice(0,-1);
						} else {
							newarr_def[i] = document.getElementById("newtype_def_"+i).innerText.split("(")[1];
							newarr_def[i] = newarr_def[i].slice(0,-1);
						}
						if (newarr_def[i]=="-1")
							Game.weakmono[newname].push(Game.types[i])*/
						newarr_att[i] = 0;

						// Game.chart[Game.max-1].forEach(function(col){
							// console.log("add def", newarr_def[i])
							Game.chart[Game.max].push(Number(newarr_def[i]));
						// })
					}

					Game.max = Game.types.length;

					gametotal();

					reset(0);
					createtable();

					document.getElementById("mainmenu").click();
					document.getElementById("menu_1").click();
					document.getElementById("menu_5").click();
				} else {

				}				
			}
			else if (value=="cancel"){
				document.getElementById("menu_1").click();
				document.getElementById("menu_2").click();
			} else {

				var mode = event.srcElement.id.split("_")[1];
				var against = event.srcElement.id.split("_")[2];
					// against = Game.types[Number(against)];
				// console.log("from:",mode,against,value);

				if (String(value)=="netural (0)"){
					document.getElementById("newtype_"+mode+"_"+against).innerText = "strong (1)";
					document.getElementById("newtype_"+mode+"_"+against).style.backgroundColor = Data.Color.notok;
				} else if (String(value)=="strong (1)"){
					document.getElementById("newtype_"+mode+"_"+against).innerText = "weak (-1)";
					document.getElementById("newtype_"+mode+"_"+against).style.backgroundColor = "#0000ff";
					document.getElementById("newtype_"+mode+"_"+against).style.color = "white";
				} else if (String(value)=="weak (-1)"){
					if (mode=="att")
						document.getElementById("newtype_"+mode+"_"+against).innerText = "unaffective (-99)";
					else if (mode=="def")
						document.getElementById("newtype_"+mode+"_"+against).innerText = "immune (-99)";
					document.getElementById("newtype_"+mode+"_"+against).style.backgroundColor = "#ac151b";
					document.getElementById("newtype_"+mode+"_"+against).style.color = "white";
				} else if (String(value)=="unaffective (-99)" || String(value)=="immune (-99)"){
					document.getElementById("newtype_"+mode+"_"+against).innerText = "netural (0)";
					document.getElementById("newtype_"+mode+"_"+against).style.backgroundColor = "";
					document.getElementById("newtype_"+mode+"_"+against).style.color = "black";
				}
			}


		}

		function alterchart(){
			if (event.srcElement.innerText == "add type"){
				// console.log("ya")
				event.srcElement.disabled = true;

				document.getElementById("divexp").innerHTML += "<br><br><div id='addtypewiz'></div>";

				document.getElementById("addtypewiz").innerHTML += "Name (1 word) : <input id='newtypename' size=8></input><br>"
				document.getElementById("addtypewiz").innerHTML += "<img src='src/nuevotipo.png'><br>";
				
				/*document.getElementById("addtypewiz").innerHTML += "<b>When attacking</b>, it would be...<br>";
				var j = 0;
				Game.wikitypesrc.forEach(function(imgsrc){
					document.getElementById("addtypewiz").innerHTML += "<button onclick='newtype()' id='newtype_att"+"_"+j+"'>"+"netural (0)"+"</button> against ";
					document.getElementById("addtypewiz").innerHTML += "<img src="+imgsrc+" width=19>";

					document.getElementById("addtypewiz").innerHTML += "<br>";
				j++;
				})
				document.getElementById("addtypewiz").innerHTML += ", and <button onclick='newtype()' id='newtype_att"+"_"+"x"+"'>"+"netural (0)"+"</button> against <b>itself</b>.";

				document.getElementById("addtypewiz").innerHTML += "<br><br>";
				//
				document.getElementById("addtypewiz").innerHTML += "But, <b>when defending</b>, it would be...<br>";
				var j = 0;
				Game.wikitypesrc.forEach(function(imgsrc){
					document.getElementById("addtypewiz").innerHTML += "<button onclick='newtype()' id='newtype_def"+"_"+j+"'>"+"netural (0)"+"</button> against ";
					document.getElementById("addtypewiz").innerHTML += "<img src="+imgsrc+" width=19>";

					document.getElementById("addtypewiz").innerHTML += "<br>";
				j++;
				})
				document.getElementById("addtypewiz").innerHTML += ", and <button onclick='newtype()' id='newtype_def"+"_"+"x"+"'>"+"netural (0)"+"</button> against <b>itself</b>.";
				document.getElementById("addtypewiz").innerHTML += "<br><br>";
				*/

				document.getElementById("addtypewiz").innerHTML += "<button onclick='newtype()' >save</button>"
				document.getElementById("addtypewiz").innerHTML += "<button onclick='newtype()'>cancel</button>"

				document.getElementById("addtypewiz").focus();
			} else {
				if (document.getElementById("lockedstate").checked) return false;

				var row = (event.srcElement.id.split("_"))[1];
				var col = (event.srcElement.id.split("_"))[2];
				var value = event.srcElement.innerText;
				// console.log(row, col, value);

				if (String(value)=="0"){
					document.getElementById("prevch_"+row+"_"+col).innerText = 1;
					document.getElementById("prevch_"+row+"_"+col).style.backgroundColor = Data.Color.notok;
				} else if (String(value)=="1"){
					document.getElementById("prevch_"+row+"_"+col).innerText = -1;
					document.getElementById("prevch_"+row+"_"+col).style.backgroundColor = "#0000ff";
					document.getElementById("prevch_"+row+"_"+col).style.color = "white";
				} else if (String(value)=="-1"){
					document.getElementById("prevch_"+row+"_"+col).innerText = -99;
					document.getElementById("prevch_"+row+"_"+col).style.backgroundColor = "#ac151b";
					document.getElementById("prevch_"+row+"_"+col).style.color = "white";
				} else if (String(value)=="-99"){
					document.getElementById("prevch_"+row+"_"+col).innerText = 0;
					document.getElementById("prevch_"+row+"_"+col).style.backgroundColor = "";
					document.getElementById("prevch_"+row+"_"+col).style.color = "black";
				}
				Game.chart[row][col] = Number(document.getElementById("prevch_"+row+"_"+col).innerText);
				// console.log(Data.Main[Game.chartver])
			}
											
		}

		function returnchart(){
			alert("To reset chart, re-select any other Chart ver., then select Expr once again.")
			// Game.chart = [];
			// var newchart = [];
			// 	newchart = Data.Main[Game.chartver].Chart;
			// console.log(Game.chart)
			// console.log(newchart)
			// Game.chart = newchart;
			// document.getElementById("menu_1").click();
			// document.getElementById("menu_5").click();
		}

		function showmenu(){
			// console.log(event.srcElement)
			// if (!event){
			// 	alert("9a")
			// } else {
			switch (event.srcElement.href.split("#")[1]){				
				case "types":
					// console.log(111);
					document.getElementById("divexp").innerHTML = "";

					var first = Game.interface.first;
					var last = Game.interface.last;

					if (Game.wikitypesrc){
						for (var i=first; i<last; i++){
							if (!Game.wikitypesrc[Game.types.indexOf(Data.TypesChain[i])]){
								document.getElementById("divexp").innerHTML += "<br><img width=64 src='" + "src/nuevotipo.png" + "'</img>"
							} else document.getElementById("divexp").innerHTML += "<br><img width=64 src='" + Game.wikitypesrc[Game.types.indexOf(Data.TypesChain[i])] + "'</img>"
							if (i==last-1){
								document.getElementById("divexp").innerHTML += "<br><button onclick='nextchain()'>next</button>"

								if (Game.title=="Expr")
									document.getElementById("divexp").innerHTML += " /// <button onclick='alterchart()'>add type</button>"
							} 
							else document.getElementById("divexp").innerHTML += "<br> is weak to <img width='16' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Eo_circle_red_arrow-down.svg/240px-Eo_circle_red_arrow-down.svg.png'>"
							//appendChild(document.createElement("img")).src = Game.wikitypesrc[i];
						}
						// Game.wikitypesrc.forEach(function(href){
						// 	document.getElementById("divexp").appendChild(document.createElement("img")).src = href;
						// })
					}
					break;
				case "availables":
					// console.error("sussy");
					document.getElementById("divexp").innerHTML = "<br>These are available with ";
					document.getElementById("divexp").innerHTML += "<select id='sel_avb'>"
					document.getElementById("divexp").innerHTML += "</select>";
					document.getElementById("sel_avb").setAttribute("onChange", "sel_numoweak()");

					document.getElementById("sel_avb").innerHTML += "<option disabled>?</option>"
					for (var i=0; i<11; i++){
						//11 is currently the max num of weaknesses of dragon-ize-grass typed mon
						// if ()
						document.getElementById("sel_avb").innerHTML += "<option value='"+i+"'>"+i+"</option>"
					}
					document.getElementById("divexp").innerHTML += " weakness(es) :";					
					// console.log(Game.availables);

					// if (JSON.stringify(Game.availables)=="{}"){
					// 	document.getElementById("menu_4").click();
					// 	return false;
					// }

					var arr_todel = [];
					if (Game.availables && JSON.stringify(Game.availables)!="{}"){
						for (var i=0; i<11; i++){
							if (!Game.availables[i]){
								arr_todel.push(i);
							}
						}
					} else {

						console.log("owajyanaite", arr_todel, JSON.stringify(Game.availables));
					}

					arr_todel.forEach(function(id){
						// console.error(document.getElementById("sel_avb").children.length)
						for (var i=0; i<document.getElementById("sel_avb").children.length; i++){
							// console.log(id, document.getElementById("sel_avb").children[i].innerText)
							if (id == Number(document.getElementById("sel_avb").children[i].innerText)){
								document.getElementById("sel_avb").removeChild(document.getElementById("sel_avb").children[i])
							}
						}
					})

					if (JSON.stringify(Game.availables)=="{}"){
						if (document.getElementById("sel_avb") && document.getElementById("helpdiv").style.height=="80%")
						document.getElementById("sel_avb").outerHTML = "<select id='sel_avb' onchange='sel_numoweak()'></select>";							
					}

					// document.getElementById("menu_4").click();
					// console.log(222);
					break;
				case "usage":
					document.getElementById("divexp").innerHTML = "<br>Just try some stuffs!"
					break;
				case "chart":
					document.getElementById("divexp").innerHTML = "<br>Below is the current matrices :";
					if (Game.title=="Expr"){
						document.getElementById("divexp").innerHTML += "              (<input id='lockedstate' type='checkbox'>Locked</input>)"
					} else 
					document.getElementById("divexp").innerHTML += "              (<input type='checkbox' checked onclick='return false'>Locked</input>)"

					document.getElementById("divexp").innerHTML += " /// <button onclick='returnchart()'>reset chart</button>"

					document.getElementById("divexp").innerHTML += "<br>"
					document.getElementById("divexp").innerHTML += "<b>----------Att.</b>";
					for (var i=0; i<Game.types.length; i++){
						document.getElementById("divexp").innerHTML += "----"

					}
					document.getElementById("divexp").innerHTML += "<b>Def.</b>"
					

					document.getElementById("divexp").innerHTML += "<br>"
					Game.wikitypesrc.forEach(function(imgrsc){
						document.getElementById("divexp").innerHTML += "<img width=26 src='"+imgrsc+"'>"
					});
					document.getElementById("divexp").innerHTML += "<br>"
					var i = 0;
					Game.chart.forEach(function(row){
						// document.getElementById("divexp").innerHTML += "<button style='width:26px'>"+row[0]+"</button>"
						var j = 0;
						row.forEach(function(col){
							if (col==1) document.getElementById("divexp").innerHTML += "<button style='color: black;background-color: "+Data.Color.notok+";width: 26px;' onclick='alterchart()' id='prevch_"+i+"_"+j+"'>"+col+"</button>";
							else if (col==-1) document.getElementById("divexp").innerHTML += "<button style='color: white;background-color: "+"#0000ff"+";width: 26px;' onclick='alterchart()' id='prevch_"+i+"_"+j+"'>"+col+"</button>";
							else if (col==-99) document.getElementById("divexp").innerHTML += "<button style='color: white;background-color: "+"#ac151b"+";width: 26px;' onclick='alterchart()' id='prevch_"+i+"_"+j+"'>"+col+"</button>";
							else document.getElementById("divexp").innerHTML += "<button onclick='alterchart()' style='width:26px' id='prevch_"+i+"_"+j+"'>"+col+"</button>";
							j++;
						})
						document.getElementById("divexp").innerHTML += "<img height=18 src='"+Game.wikitypesrc[i]+"'>"
						i++;
						document.getElementById("divexp").innerHTML += "<br>"
					})

					Game.wikitypesrc.forEach(function(imgrsc){
						document.getElementById("divexp").innerHTML += "<img width=26 src='"+imgrsc+"'>"
					});
					break;
				default :
					alert(123);
				// 	document.getElementById("divexp").innerHTML = "";
					break;
			}
			// }
		}
		
		function createtable(){
			var mon = Game.mon;
			document.body.appendChild(document.createElement('div')).id="maindiv";
			document.getElementById("maindiv").style.backgroundColor = "#eaeaea";
			document.getElementById("maindiv").style.width = "100%";
			document.getElementById("maindiv").style.height = "100%";
			document.getElementById("maindiv").style.overflow = "auto";

			document.getElementById("maindiv").appendChild(document.createElement('div')).id="folddiv";
			document.getElementById("folddiv").style.backgroundColor = "#bababa";
			document.getElementById("folddiv").style.width = "100%";
			document.getElementById("folddiv").style.height = "0px"; //"300px";
			document.getElementById("folddiv").style.overflow = "auto";
			document.getElementById("folddiv").style.position = "absolute";
			document.getElementById("folddiv").style.zIndex = 10;
			document.getElementById("folddiv").style.opacity = 0.90;
			if (!document.getElementById("table_2"))
				// document.body.appendChild(document.createElement('table')).id="table_2";
				document.getElementById("folddiv").appendChild(document.createElement('table')).id="table_2";

			document.getElementById("maindiv").appendChild(document.createElement('div')).id="helpdiv";
			document.getElementById("helpdiv").style.backgroundColor = "#ffffff";
			document.getElementById("helpdiv").style.width = "80%";
			document.getElementById("helpdiv").style.height = "0px"; //"80%";
			document.getElementById("helpdiv").style.marginLeft = "10px";
			// document.getElementById("helpdiv").style.paddingTop = "-25px";
			document.getElementById("helpdiv").style.paddingLeft = "10px";
			document.getElementById("helpdiv").style.overflow = "auto";
			document.getElementById("helpdiv").style.position = "absolute";
			// document.getElementById("helpdiv").style.left = "10%";
			document.getElementById("helpdiv").style.zIndex = 10;
			document.getElementById("helpdiv").style.opacity = 0.90;
			document.getElementById("helpdiv").innerHTML = "<h3>Pokemon Team Type Coverage Planner</h3>";
			var m = 1;
			["Usage","Types","StatStruct","Availables","Chart"].forEach(function(menu){
				document.getElementById("helpdiv").innerHTML += "<a id='menu_"+m+"' onclick='showmenu()' href='#"+(menu.toLowerCase())+"'>" + menu + "</a>" + " | ";
				m++;
				switch (menu){
					default :
						break;
					case "Types" :
						// console.log(event.srcElement);
						// document.getElementById("helpdiv").innerHTML += "<a href='#"+(menu.toLowerCase())+"'>" + menu + "</a>" + " | ";
						break;

					case "Availables" :
						break;
				}

			})
			document.getElementById("helpdiv").appendChild(document.createElement("div")).id = "divexp";
			document.getElementById("helpdiv").style.overflow = "auto";

			switch (document.location.href.split("#")[1]){
				default :
					// document.getElementById("divexp").innerHTML = "<br>Click link above";
					break;
				case "availables":
					// document.getElementById("divexp").innerHTML = "aaa";
					// if (Game.wikitypesrc){
					// 	Game.wikitypesrc.forEach(function(href){
					// 		document.getElementById("divexp").appendChild(document.createElement("img")).src = href;
					// 	})
					// }

					break;
			}

			// if (!document.getElementById("table_2"))
			// 	// document.body.appendChild(document.createElement('table')).id="table_2";
			// 	document.getElementById("helpdiv").appendChild(document.createElement('table')).id="table_2";
			
				
			document.getElementById('table_2').setAttribute('border',1);

			document.getElementById('table_2').innerHTML = "";
			
			for (var e=0; e<Game.numofpoke; e++){
				if (!document.getElementById("tr2_"+e))
					document.getElementById('table_2').appendChild(document.createElement('tr')).id = "tr2_"+e;
				for (var f=0; f<Game.numofpoke+1; f++){
					if (e==0){
						if (f!=0) document.getElementById('tr2_'+e).appendChild(document.createElement('td')).id = "avail_"+f;
						else {
							document.getElementById('tr2_'+e).appendChild(document.createElement('td')).innerText = "#Avail.";
						}
					} else {
						if (e>0&&f==0){
							if (e==3) document.getElementById('tr2_'+e).appendChild(document.createElement('td')).innerText = "Immun.";
							else if (e==1 || e==2) document.getElementById('tr2_'+e).appendChild(document.createElement('td')).innerText = "Type"+e;
							else if (e==5) document.getElementById('tr2_'+e).appendChild(document.createElement('td')).innerHTML = "<button onclick=copy()>copy</button><button onclick=load()>load</button>";
							else if (e==Game.numoconf) document.getElementById('tr2_'+e).appendChild(document.createElement('td')).innerHTML = "Add.";
						} else {
							if (e==1 || e==2)
							document.getElementById('tr2_'+e).appendChild(document.createElement('td')).id = "mon"+f+"_t"+e;
							else if (e==3)
							document.getElementById('tr2_'+e).appendChild(document.createElement('td')).id = "mon"+f+"_imun";
							else  if (e==5)
							document.getElementById('tr2_'+e).appendChild(document.createElement('td')).id = "con"+f;
							else  if (e==Game.numoconf)
							document.getElementById('tr2_'+e).appendChild(document.createElement('td')).id = "confplus_"+f;

							//document.getElementById("cell2_"+e+"_"+f).innerText = "___";

						}

					}

				}
			}

			for(var f=1; f<Game.numofpoke+1; f++){
				if (!document.getElementById("avail_sel_"+f))
					document.getElementById("avail_"+f).appendChild(document.createElement('select')).id = "avail_sel_"+f;

				document.getElementById("avail_sel_"+f).setAttribute("onChange", "sel_mon()");

				document.getElementById("avail_sel_"+f).style.width = Data.Univ.Width+"px";
			}
			
			for(var f=1; f<Game.numofpoke+1; f++){
				if (!document.getElementById("imun_sel_"+f))
					document.getElementById("mon"+f+"_imun").appendChild(document.createElement('select')).id = "imun_sel_"+f;
				document.getElementById("imun_sel_"+f).disabled = true;
				document.getElementById("imun_sel_"+f).innerHTML += "<option selected value=''>.</option>";
				Game.listofimmun.forEach(function(i){
					document.getElementById("imun_sel_"+f).innerHTML += "<option value=anti-"+i+">anti-"+i+"</option>";
				});
				document.getElementById("imun_sel_"+f).setAttribute("onChange", "imunis("+f+")");
			}

			for (var f=1; f<Game.numofpoke+1; f++){
				if (!document.getElementById("del_"+f))
					if(document.getElementById('con'+f))
						document.getElementById('con'+f).appendChild(document.createElement("button")).id="del_"+f;
				if (document.getElementById("del_"+f)){
					document.getElementById('del_'+f).innerText = "-";
					document.getElementById('del_'+f).setAttribute('onclick',"recalculate('del',"+Number(f-1)+")");
					document.getElementById('del_'+f).setAttribute("style", "width:24px;height:24px");					
				}
			}

			for (var f=1; f<Game.numofpoke+1; f++){
				// if (!document.getElementById("imun_sel_"+f))
				document.getElementById("confplus_"+f).appendChild(document.createElement('select')).id = "confplus_sel_"+f;
				document.getElementById("confplus_sel_"+f).disabled = true;
				document.getElementById("confplus_sel_"+f).innerHTML += "<option selected value=''>.</option>";
				var q = 1;
				Data.Univ.Type3s_.forEach(function(t3){
					document.getElementById("confplus_sel_"+f).innerHTML += "<option value=type3-"+q+">"+t3+"</option>";
					q++;

				})
				document.getElementById("confplus_sel_"+f).setAttribute("onChange", "type3is("+f+")");
				// console.log(document.getElementById("confplus_"+f))
			}

			if (!document.getElementById("table_3"))
				// document.body.appendChild(document.createElement('table')).id = "table_3";
				document.getElementById("folddiv").appendChild(document.createElement('table')).id = "table_3";
			document.getElementById("table_3").setAttribute("border", '1');
			document.getElementById("table_3").innerHTML = "";
			document.getElementById("table_3").innerHTML += "Weakness: ";
			
			if (!document.getElementById("table_4"))
				//document.body.appendChild(document.createElement('table')).appendChild(document.createElement('tr')).appendChild(document.createElement('td')).id = "table_4";
				document.getElementById("folddiv").appendChild(document.createElement('table')).appendChild(document.createElement('tr')).appendChild(document.createElement('td')).id = "table_4";
			reset("safe");

			if (!document.getElementsByTagName("hr"))
			document.body.appendChild(document.createElement('hr'));

			if (!document.getElementById("table_1"))
				//document.body.appendChild(document.createElement('table')).id="table_1";
				document.getElementById("maindiv").appendChild(document.createElement('table')).id="table_1";
			document.getElementById("table_1").innerHTML = "";

			document.getElementById('table_1').setAttribute('border',0);
			document.getElementById('table_1').setAttribute('class','table_1');

			//this makes me dizzy
			/*document.getElementById('table_1').appendChild(document.createElement("tr")).id = "tr_-1";
			for (var t=0; t<Game.types.length+1; t++){
				if (t>1)
					document.getElementById('tr_-1').appendChild(document.createElement("td")).outerHTML = "<td style='text-align:right;'>"+"<button id='swap_"+t+"' onclick='swapleft()' style='height:16px; width:6px;'><</button>"+"</td>";
				else document.getElementById('tr_-1').appendChild(document.createElement("td")).outerHTML = "<td style='text-align:center;'>"+""+"</td>";
			}*/

			document.getElementById('table_1').appendChild(document.createElement('tr')).id = "tr_0";
			document.getElementById('tr_0').style.height = "10px";
			document.getElementById('table_1').setAttribute('style','width:'+Data.Univ.Width+'px;');
			document.getElementById('tr_0').innerHTML = "";
				document.getElementById('tr_0').appendChild(document.createElement('td')).innerHTML="<table border=0 height=0><tr><td>_</td><td>_</td></tr><tr><td>_</td><td>_</td></tr></table>";
			var b=1;
			// document.getElementById('tr_0').innerHTML = "<td><table border='0' height='0'><tbody><tr><td>_</td><td>_</td></tr><tr><td>_</td><td>_</td></tr></tbody></table></td>";			
			for (var a=1; a<Game.types.length+1; a++){
				if (Game.wikitype[a-1] == "") document.getElementById('tr_0').appendChild(document.createElement('td')).outerHTML = "<td><img width=30 class='smallicon' src='src/nuevotipo.png'></img></td>";
				else document.getElementById('tr_0').appendChild(document.createElement('td')).outerHTML = "<td><img class='smallicon' width=30 src='https://upload.wikimedia.org/wikipedia/commons/thumb/"+Game.wikitype[a-1]+"/Pok%C3%A9mon_"+Game.typesUp[a-1]+"_Type_Icon.svg/240px-Pok%C3%A9mon_"+Game.typesUp[a-1]+"_Type_Icon.svg.png'</img></td>";
				// document.getElementById('tr_0').appendChild(document.createElement('td')).outerHTML="<td style='height:10px;'></td>";
				document.getElementById('table_1').appendChild(document.createElement('tr')).id="tr_"+(b);
				b++;
			}

			for (var a=1; a<Game.types.length+1; a++){
				var namatr = "tr_"+Number(a);
				if (Game.wikitype[a-1] == "") document.getElementById(namatr).appendChild(document.createElement('td')).innerHTML = "<img width=30 style='margin-left: 4px;' src='src/nuevotipo.png'></img>";
				else document.getElementById(namatr).appendChild(document.createElement('td')).innerHTML = "<img width=30 style='margin-left: 4px;' src='https://upload.wikimedia.org/wikipedia/commons/thumb/"+Game.wikitype[a-1]+"/Pok%C3%A9mon_"+Game.typesUp[a-1]+"_Type_Icon.svg/240px-Pok%C3%A9mon_"+Game.typesUp[a-1]+"_Type_Icon.svg.png'</img>";

				for (var b=1; b<Game.types.length+1; b++){
					document.getElementById(namatr).appendChild(document.createElement('td')).id="cell_"+a+"_"+b;
					document.getElementById("cell_"+a+"_"+b).setAttribute("style","padding:0px;border-spacing:0px;")
				}

				document.getElementById(namatr).appendChild(document.createElement("td")).outerHTML = document.getElementById("tr_"+a).children[0].outerHTML;
			}

			document.getElementById("table_1").appendChild(document.createElement("tr")).id = "tr_99";
			document.getElementById("tr_99").outerHTML = document.getElementById("tr_0").outerHTML;

			for (var c=1; c<Game.types.length+1; c++){
				for (var d=1; d<Game.types.length+1; d++){
					if (d>=1 && c<=d ){
						//
						var cell = document.createElement("div");
							cell.setAttribute("id", "cell"+c+d);
							cell.setAttribute("class", "cell");
							cell.setAttribute("onclick","selectcell('"+c+"_"+d+"')");
							cell.innerText = 1;
							document.getElementById("cell_"+c+"_"+d).appendChild(cell).id="tbl_"+c+"_"+d;
					} else {
					}					
				}
			}

			if (!document.getElementsByTagName("hr"))
			document.body.appendChild(document.createElement('hr'));

			// if (Game.mon) console.log(Game.mon)

			// document.getElementById("che_res").click();
			// document.getElementById("che_res").click();
			freemode();
			recolorchosen();
		}

		function showdb(){
			if(document.getElementById("embed").style.visibility=="visible"){
				// document.getElementById("embed").style.visibility = 'hidden';
			} else {
				// document.getElementById("embed").style.visibility = 'visible';
			}
			if(document.getElementById("embed").style.height=="0px"){
				document.getElementById("embed").style.height = "1000px";
			} else {
				document.getElementById("embed").style.height = "0px";
			}
		}

		function restrict(){
			// return false;
			var mon = Game.mon;
			var state = event.srcElement.checked;
			Game.restriction = state;
			//console.log(state);
			freemode(Game.restriction);
			// if (state)


			detailing();
			recolorchosen(mon);
		}

		function add_right(){
			var mon = Game.mon;
			var newid;

			var numofpoke = document.getElementById("table_2").children[0].children.length - 1;
			Game.numofpoke = numofpoke+1;
			for (var i=0; i<=Game.numoconf+1; i++){
				if (i==0) newid = "avail_"+(i+ Game.numofpoke);
				else if (i==1) newid = "mon"+(i+Game.numofpoke-1)+"_t1";
				else if (i==2) newid = "mon"+(i+Game.numofpoke-2)+"_t2";
				else if (i==3) newid = "mon"+(i+Game.numofpoke-3)+"_imun";
				else if (i==4) newid = "confplus_"+(i+Game.numofpoke-4);
				else if (i==5) newid = "con"+(i+Game.numofpoke-5);
				// document.getElementById("tr2_"+i).innerHTML += "<td id="+newid+"></td>";
				document.getElementById("tr2_"+i).appendChild(document.createElement("td")).id = newid;
			}
			
			document.getElementById("con"+Number(1+numofpoke)).innerHTML = "<button id='del_"+Number(1+numofpoke)+"' onclick='recalculate(`"+"del"+"`,"+numofpoke+")' style='width:24px;height:24px'>-</button>";
			document.getElementById("mon"+(Game.numofpoke)+"_imun").innerHTML = "";
			document.getElementById("mon"+(Game.numofpoke)+"_imun").appendChild(document.createElement('select')).id = "imun_sel_"+Game.numofpoke;
			document.getElementById("imun_sel_"+Game.numofpoke).width = Data.Univ.Width;
			document.getElementById("confplus_"+(Game.numofpoke)).innerHTML = "a";
			document.getElementById("confplus_"+(Game.numofpoke)).innerHTML = "<select id='confplus_sel_"+Game.numofpoke+"' disabled onchange='type3is("+Game.numofpoke+")'><option selected='' value=''>.</option><option value='type3-1'>Trick or Treat</option><option value='type3-2'>Forest Curse</option></select>";
			document.getElementById("confplus_sel_"+Game.numofpoke).style.width = Data.Univ.Width + "px";
			document.getElementById("imun_sel_"+Game.numofpoke).disabled = true;
			document.getElementById("imun_sel_"+Game.numofpoke).innerHTML += "<option selected value=''>.</option>";
			document.getElementById("avail_"+(Number(Game.numofpoke))).style = "background-color: rgb(255, 255, 255);"

			// for(var f=1; f<Game.numofpoke+1; f++){
				if (!document.getElementById("avail_sel_"+Game.numofpoke))
					document.getElementById("avail_"+Game.numofpoke).appendChild(document.createElement('select')).id = "avail_sel_"+Game.numofpoke;
				document.getElementById("avail_sel_"+Game.numofpoke).setAttribute("onChange", "sel_mon()");
				document.getElementById("avail_sel_"+Game.numofpoke).style.width = Data.Univ.Width+"px";
			// }
			Game.listofimmun.forEach(function(i){
				document.getElementById("imun_sel_"+Game.numofpoke).innerHTML += "<option value=anti-"+i+">anti-"+i+"</option>";
			});
			document.getElementById("imun_sel_"+Game.numofpoke).setAttribute("onChange", "imunis("+Game.numofpoke+")");

			document.getElementById("monnum").innerText = String(mon.length + "/" + Number(document.getElementById("tr2_0").children.length-1));
		}

		function del_right(){
			var mon = Game.mon;
			var numofpoke = document.getElementById("table_2").children[0].children.length - 1;
			if(numofpoke<2) {
				reset(0);
			} else {
				Game.numofpoke = numofpoke-1;
				/*if (mon.length>0){
					if (mon.length>Game.numofpoke){

						if (document.getElementById("mon"+mon.length+"_t1")){
							// console.log(document.getElementById("mon"+mon.length+"_t1").innerHTML);
							if (document.getElementById("mon"+mon.length+"_t1").innerHTML == ""){
								console.warn("empty");
							} else {
								// add_right();
								console.error(Game.numofpoke, "mon",mon.length);
							}
							// console.log(document.getElementById("mon"+Game.numofpoke+"t1"));
						}
					}
				}*/
				

				for (var i=0; i<=Game.numoconf+1; i++){
					document.getElementById("tr2_"+i).removeChild(document.getElementById("tr2_"+i).children[document.getElementById("tr2_"+i).children.length-1]);
				}
				document.getElementById("monnum").innerText = String(mon.length + "/" + Number(document.getElementById("tr2_0").children.length-1));

				if (Number(document.getElementById("tr2_0").children.length-1) < mon.length){
					recalculate("del",mon.length-1);
				}
			}

		}

		function fold (){
			var w = Number(document.getElementById("folddiv").style.height.split("px")[0]);

			var wh = Number(document.getElementById("helpdiv").style.height.split("%")[0]);

			// console.log(wh);
			if (w>10){
				document.getElementById("folddiv").style.height = "0px";
			} else {
				if (wh==80){
					document.getElementById("helpdiv").style.height = "0%";
				}
				document.getElementById("folddiv").style.height = "350px";
			}
		}

		function type3is(){
			var mon = Game.mon;
			var i =event.srcElement.id[event.srcElement.id.length-1];
			// console.log(i,"----");
			var part1 = "<select id='confplus_sel_"+i+"' onchange='type3is()'><option value>.</option><option value='type3-1'>Trick or Treat</option><option value='type3-2'>Forest Curse</option></select>";
			var t3,part2;
			if (event.srcElement.value == "" || !event.srcElement.value){
				// console.log("reset")
			} else {

			}
			if (event.srcElement.value=="type3-1"){
				t3 = "ghost";
				part2 = "<br><img width='"+Data.Univ.Width+"' src='https://serebii.net/pokedex-bw/type/"+t3+".gif' alt='"+t3+"'>";
				mon[i-1].type3 = t3;
			} else if (event.srcElement.value=="type3-2"){
				t3 = "grass";
				part2 = "<br><img width='"+Data.Univ.Width+"' src='https://serebii.net/pokedex-bw/type/"+t3+".gif' alt='"+t3+"'>";
				mon[i-1].type3 = t3;
			} else {
				// t3 = 0;
				part2 = "";
			}
			document.getElementById("confplus_"+i).innerHTML = part1 + part2;
			document.getElementById("confplus_"+i).style.width = "0px";
			document.getElementById("confplus_sel_"+i).value = event.srcElement.value;
			document.getElementById("confplus_sel_"+i).style.width = Data.Univ.Width + "px";
			var t3arr = [];
			Game.types.forEach(function(t){
				if (!t3) t3arr[Game.types.indexOf(t)] = 1;
				else t3arr[Game.types.indexOf(t)] = -99;//(Game.chart[Game.types.indexOf(t3)][Game.types.indexOf(t)]);				
			});
			mon[i-1].weakrecap.Matrices[2] = t3arr;
			if (!t3 && mon[i-1].weakrecap.Matrices.length>2) {
				// console.error(9)
				mon[i-1].weakrecap.Matrices.pop();
			}
			weakrecap(mon[i-1]);
			// console.log(mon[0])


			recalculate("allweak");

			subtotal(mon.length-1);

			reset("safe");
			redraw();

			freemode();

			avail_check(mon);
			recolorchosen(mon);

		}

		function chooseability(a,id){
			var abil = ""
			switch(a.toLowerCase()){
				case "":
					// Game.mon[now-1].ability = result.abilities;
					break;
				case "levitate":
					if (document.getElementById("imun_sel_"+id)){
						document.getElementById("imun_sel_"+id).value = "anti-ground";
						// document.getElementById("imun_sel_"+id).children[4].innerText = a;
					}
					break;
				case ("motor-drive"):
				case ("volt-absorb"):
				case ("lightning-rod"):
					if (document.getElementById("imun_sel_"+id)){
						document.getElementById("imun_sel_"+id).value = "anti-electric";
						// document.getElementById("imun_sel_"+id).children[3].innerText = a;								
					}
					break;
				case ("sap-sipper"):
					if (document.getElementById("imun_sel_"+id)){
						document.getElementById("imun_sel_"+id).value = "anti-grass";
						// document.getElementById("imun_sel_"+id).children[5].innerText = a;								
					}
					break;
				case ("flash-fire"):
				case ("primordial-sea"):
					if (document.getElementById("imun_sel_"+id)){
						document.getElementById("imun_sel_"+id).value = "anti-fire";
						// document.getElementById("imun_sel_"+id).children[1].innerText = a;					
					}
					break;
				case ("water-absorb"):
				case ("desolate-land"):
					if (document.getElementById("imun_sel_"+id)){
						document.getElementById("imun_sel_"+id).value = "anti-water";
						// document.getElementById("imun_sel_"+id).children[2].innerText = a;								
					}
					break;
			}			 
			Game.mon[id-1].ability = a;   	
			imunis(id);
			// console.log(Game.mon[id-1])
    	}	

		function detailing(){
			// return false;

			var mon = Game.mon;
			if (Game.chartver=='1' || Game.title=="GSC") return false;

			if (mon) if(mon.length==0){
				for (var col = 1; col<Game.max+1; col++){
					for (var row = 1; row<Game.max+1; row++){
						if (document.getElementById("tbl_"+row+"_"+col)){
							document.getElementById("tbl_"+row+"_"+col).setAttribute("onclick", "selectcell(`"+row+"_"+col+"`)") ;
							document.getElementById("tbl_"+row+"_"+col).style.textIndent = "100%";
						}
					}
				}
				return true;
			} 

			for (var col = 1; col<Game.max+1; col++){
				for (var row = 1; row<Game.max+1; row++){
					if (document.getElementById("tbl_"+row+"_"+col)){
						if (document.getElementById("tbl_"+row+"_"+col).innerText == '0'
							){
							if (!document.getElementById("che_res").checked){
								document.getElementById("tbl_"+row+"_"+col).innerText = '0';
								document.getElementById("tbl_"+row+"_"+col).style.textIndent = "100%";
								document.getElementById("tbl_"+row+"_"+col).setAttribute("onclick", "selectcell(`"+col+"_"+row+"`)") ;
							} else {
								var temp10 = maketemp(Game.types[row-1],Game.types[col-1]);
								weakrecap(temp10);
								var numofsameweak = 0;
								temp10.weakto.forEach(function(wt){
									if (document.getElementById("che_res").checked){
										/*if (temp10.weakto.length==1){
											document.getElementById("tbl_"+row+"_"+col).style.backgroundColor = "#ffe933";
										} else if (temp10.weakto.length==2){
											document.getElementById("tbl_"+row+"_"+col).style.backgroundColor = "#ffd822";
										} else if (temp10.weakto.length==3){
											document.getElementById("tbl_"+row+"_"+col).style.backgroundColor = "#ffa711";
										} else if (temp10.weakto.length==4){
											document.getElementById("tbl_"+row+"_"+col).style.backgroundColor = "#ff9600";
										} else if (temp10.weakto.length==5){
											document.getElementById("tbl_"+row+"_"+col).style.backgroundColor = "#ff8500";
										} else if (temp10.weakto.length==6){
											document.getElementById("tbl_"+row+"_"+col).style.backgroundColor = "#ff7400";
										} else {//if (temp10.weakto.length==7){
											document.getElementById("tbl_"+row+"_"+col).style.backgroundColor = "#ff6300";
										}*/
									}									
									
									// console.log(allweak);
									if (allweak.indexOf(wt)>-1) {
										numofsameweak++;
										document.getElementById("tbl_"+row+"_"+col).style.textIndent = "0%";
									}	

									if (numofsameweak!=1){
										document.getElementById("tbl_"+row+"_"+col).innerText = 0;
										document.getElementById("tbl_"+row+"_"+col).style.textIndent = "100%";
									} else {
										// Game.listofimmun.forEach(function(im){
										//clickable sharedweak
										["ground"].forEach(function(im){
											if (wt==im && allweak.indexOf(im)>-1){
												document.getElementById("tbl_"+row+"_"+col).style.backgroundColor = Data.Color.doubt;
												document.getElementById("tbl_"+row+"_"+col).setAttribute("onclick", "selectcell(`"+row+"_"+col+"`, `"+Game.types.indexOf(im)+"`)") ;
											} else {
											}
										})													
													
										//re-crosscheck with allweak
										if (document.getElementById("tbl_"+row+"_"+col).style.backgroundColor == Data.Color.doubt_){
											temp10.weakto.forEach(function(im){
												if (allweak.indexOf(im)>0 && im!="ground"){
													document.getElementById("tbl_"+row+"_"+col).style.backgroundColor = Data.Color.notok;
													document.getElementById("tbl_"+row+"_"+col).setAttribute("onclick", "selectcell(`"+row+"_"+col+"`, `"+Game.types.indexOf(im)+"`)") ;													
												}
											})
										}
										
									}
								});
							}
						} //else document.getElementById("tbl_"+row+"_"+col).style.textIndent = "100%";
					}
				}
			}
			for (var col = 1; col<Game.max+1; col++){
				for (var row = 1; row<Game.max+1; row++){
					if (document.getElementById("tbl_"+row+"_"+col)){
						if (document.getElementById("tbl_"+row+"_"+col).innerText=="0"){
							document.getElementById("tbl_"+row+"_"+col).style.textIndent = "100%";

						} else if (document.getElementById("tbl_"+row+"_"+col).innerText=="1"){
							document.getElementById("tbl_"+row+"_"+col).style.textIndent = "100%";
							// console.log(row,col,document.getElementById("tbl_"+row+"_"+col).style.backgroundColor)
							if (document.getElementById("tbl_"+row+"_"+col).style.backgroundColor=="rgb(255, 255, 255)"){
								// console.warn(Game.types[row-1],Game.types[col-1]);
								document.getElementById("tbl_"+row+"_"+col).setAttribute("onclick", "selectcell(`"+col+"_"+row+"`)") ;
							}
							// if (!document.getElementById("che_res").checked){
						} 
					}
				}
			}
		}

		var getPokemonData = async term => {
			var mon = Game.mon;
			// console.warn(term);
		    var tid_pokeapi = {
				'normal' : 1
				,'fighting' : 2
				,'flying' : 3
				,'poison' : 4
				,'ground' : 5
				,'rock' : 6
				,'bug' : 7
				,'ghost' : 8
				,'steel' : 9
				,'fire' : 10
				,'water' : 11
				,'grass' : 12
				,'electric' : 13
				,'psychic' : 14
				,'ice' : 15
				,'dragon' : 16
				,'dark' : 17
				,'fairy' : 18
			};
		    var url = ``;
		    if (term[0]=="type"){
		     url = `https://pokeapi.co/api/v2/`+term[0]+`/${tid_pokeapi[term[1]]}`;
		    } else if (term[0]=="pokemon"){
		     url = `https://pokeapi.co/api/v2/`+term[0]+`/${term[1]}`;
		    } else if (term[0]=="ability"){
		    	url = `https://pokeapi.co/api/v2/`+"pokemon"+`/${term[1]}`;
		    } else if (term[0]=="image"){
		    	url = `https://pokeapi.co/api/v2/`+"pokemon"+`/${term[1]}`;
		    }
		    else return;
		    const response = await fetch(url);
		    if (response && response.status!=404 && response.status!=200) console.log(response.status);

		    if (response.status == 200){

		    }
		    else if(response.status == 404 || response.statusText == 'Not Found'){
		    	console.error("list of pokemon is empty");
		    	// console.warn("///", term);
		        // document.getElementById('show_error').classList.add('show')
		        // document.getElementById('show_error').classList.remove('hidden')
		        return;
		    }

		    const result = await response.json();
		    // debugger;
		    if (term[0]=="type"){
			    var now = term[2];
			    Game.slot[now] = result.pokemon;

			    //filter gmax
			    Game.slot[now].forEach(function(mon){
			    	if (
			    		mon.pokemon.name.indexOf(mon.pokemon.name.split("-gmax")[1]) == 0
			    		|| mon.pokemon.name.indexOf(mon.pokemon.name.split("-totem")[1]) == 0
			    	){
			    		//
			    	} else {
			    		if (!Game.slot_) Game.slot_ = [];
			    		if (!Game.slot_[now]) Game.slot_[now] = [];
			    		Game.slot_[now].push(mon.pokemon.name);
			    	}
			    })

				document.getElementById("avail_sel_"+(term[2])).innerHTML = "";
				document.getElementById("avail_sel_"+(term[2])).innerHTML += "<option selected value disabled></option>";
				if (mon && Game.slot__ && Game.slot_[now]) {
					Game.slot_[now].sort();
					Game.slot_[now].forEach(function(m){
						getPokemonData(["pokemon", m, now, mon[mon.length-1].type2]);
					});
				}

			} else if (term[0]=="pokemon"){
				var now = term[2];				    
				if (result){
			    	if (term[3]) {
				    	if (mon[term[2]-1] && mon[term[2]-1].dual && result.types.length==2){
					    	if (
				    			(result.types[0].type.name==mon[term[2]-1].type1 && result.types[1].type.name==mon[term[2]-1].type2)
				    			|| (result.types[0].type.name==mon[term[2]-1].type2 && result.types[1].type.name==mon[term[2]-1].type1)
				    		){
				    			if (!Game.slot__) Game.slot__ = [];
				    			if (!Game.slot__[term[2]]) Game.slot__[term[2]] = [];
				    			Game.slot__[term[2]].push(result.name);
				    			if (document.getElementById("avail_sel_"+(term[2])))
					    			document.getElementById("avail_sel_"+(term[2])).innerHTML += "<option value="+result.name+">" + result.name + "</option>"
				    		}

				    	} else if (!mon[term[2]-1].dual && result.types.length==1){
				    		if (!Game.slot__) Game.slot__ = [];
				    		if (!Game.slot__[term[2]]) Game.slot__[term[2]] = [];
				    		Game.slot__[term[2]].push(result.name);
				    		if (document.getElementById("avail_sel_"+(term[2])))
								document.getElementById("avail_sel_"+(term[2])).innerHTML += "<option value="+result.name+">" + result.name + "</option>"
				    	}
					} else {
						// console.log(term[4]);

						var now = term[2];
						if (result.types.length==1){
							var id = Number(1+Game.types.indexOf(result.types[0].type.name)) + "_" + Number(1+Game.types.indexOf(result.types[0].type.name));
							
							selectcell(id);
							document.getElementById("avail_sel_"+now).value = result.name;
							Game.mon[now-1].name = result.name;
							sel_mon(now);
							// console.log(result.name, now, Game.mon[now-1], result.abilities);
							//!@#$%^&*()
						} else if (result.types.length==2){
							var id = Number(1+Game.types.indexOf(result.types[0].type.name)) + "_" + Number(1+Game.types.indexOf(result.types[1].type.name));

							if (!document.getElementById(id)){
								id = Number(1+Game.types.indexOf(result.types[1].type.name)) + "_" + Number(1+Game.types.indexOf(result.types[0].type.name));
							}
							selectcell(id);
							document.getElementById("avail_sel_"+now).value = result.name;
							Game.mon[now-1].name = result.name;
							sel_mon(now);
							// console.log(result.name, now, Game.mon[now-1], result.abilities);
							// getPokemonData(["ability", m.split("@")[0].toLowerCase(), o]);
						} 	
						
						if (term[4]){
							chooseability(term[4],now);
							// getPokemonData(["ability", Game.mon[now-1].name, now]);
						} else {
							chooseability(result.abilities[Math.floor(Math.random()*result.abilities.length)].ability.name,now);
						}				
				    }
			    }
			} else if (term[0]=="ability"){
				// console.warn(result.abilities);

			    if (result.abilities) result.abilities.forEach(function(a){
			    	chooseability(a.ability.name,term[2]);
			    	// console.error(a.ability.name);
				});
			} else if (term[0]=="image"){
			    // console.warn(term[0]);
				if (result.sprites){
					document.getElementById("con"+term[2]).innerHTML = "<button id='del_"+term[2]+"' onclick='recalculate(`del`,"+Number(-1+term[2])+")' style='width:24px;height:24px'>-</button>";
					if (document.getElementById("con"+term[2])){
						document.getElementById("con"+term[2]).appendChild(document.createElement("img")).id = "imgmon_"+term[2];
						document.getElementById("con"+term[2]).appendChild(document.createElement("br"));
						document.getElementById("imgmon_"+term[2]).src = result.sprites.front_default;
						document.getElementById("imgmon_"+term[2]).width = Data.Univ.Width;
						document.getElementById("imgmon_"+term[2]).style = "overflow:hidden; margin:-2px 0px -32px";
						document.getElementById("con"+term[2]).appendChild(document.getElementById("del_"+term[2]))

					}
				}
			}

			var q = 1;
			// console.error(Game.names)
			Game.mon.forEach(function(m){
				if (document.getElementById("avail_sel_"+q))
				document.getElementById("avail_sel_"+q).value = m.name;
				q++;
			})

			// console.clear();
		    return result;
		}

		function weakstats(){
			console.clear();
			Game.availables = {};

			if (document.getElementById("helpdiv")){
				if (document.getElementById("helpdiv").style.height == "80%")
					document.getElementById("helpdiv").style.height = "0%";
				else document.getElementById("helpdiv").style.height = "80%";
			}

			switch (document.location.href.split("#")[1]){
				case "usage":
					document.getElementById("menu_1").click();
					break;
				case "types":
					document.getElementById("menu_2").click();
					break;
				case "statstruct":
					document.getElementById("menu_3").click();
					break;
				case "availables":
					document.getElementById("menu_4").click();
					break;
				default :
					document.getElementById("menu_1").click()
					break;
			}
			// return false;

			var weakstat = [];
			for (var row=1; row<Game.max+1; row++){
				for (var col=1; col<Game.max+1; col++){
					if (document.getElementById("tbl_"+row+"_"+col)){
						if(document.getElementById("tbl_"+row+"_"+col).style.backgroundColor!="rgb(0, 0, 0)"){
							var temp11 = maketemp(Game.types[row-1], Game.types[col-1]);
							weakrecap(temp11);
							if (!weakstat[temp11.weakto.length]) weakstat[temp11.weakto.length] = [];
							weakstat[temp11.weakto.length].push([Game.types[row-1],Game.types[col-1]]);
							
							if (Game.chartver!="1"){
								Game.listofimmun.forEach(function(im){
									if (temp11.weakto.indexOf(im)>-1){
										temp11 = maketemp(Game.types[row-1], Game.types[col-1], "anti-"+im);
										weakrecap(temp11);
										if (!weakstat[temp11.weakto.length]) weakstat[temp11.weakto.length] = [];
										weakstat[temp11.weakto.length].push([Game.types[row-1],Game.types[col-1], "anti-"+im]);
									}
								});
							}

							if ((Game.chartver=="3" && Game.title!="LGPE") || Game.chartver=='9'){
								Data.Univ.Type3s.forEach(function(t3){
									if([temp11.type1, temp11.type2].indexOf(t3)<0){

										var temp12 = maketemp(Game.types[row-1], Game.types[col-1], undefined, t3);
										
										var t3arr = [];
										Game.types.forEach(function(t){
											if (!t3) t3arr[Game.types.indexOf(t)] = 1;
											else t3arr[Game.types.indexOf(t)] = -99;
										});
										temp12.weakrecap.Matrices[2] = t3arr;
										if (!t3 && temp12.weakrecap.Matrices.length>2) {
											temp12.weakrecap.Matrices.pop();
										}
										weakrecap(temp12);
										
										if (!weakstat[temp12.weakto.length]) weakstat[temp12.weakto.length] = [];
										weakstat[temp12.weakto.length].push([Game.types[row-1],Game.types[col-1], undefined, t3]);

										Game.listofimmun.forEach(function(im){
											if (temp12.weakto.indexOf(im)>-1){												
												temp12 = maketemp(Game.types[row-1], Game.types[col-1], "anti-"+im, t3);
												temp12.weakrecap.Matrices[2] = t3arr;
												weakrecap(temp12);
												if (!weakstat[temp12.weakto.length]) weakstat[temp12.weakto.length] = [];
												weakstat[temp12.weakto.length].push([Game.types[row-1],Game.types[col-1], "anti-"+im, t3]);
											}
										});
									}
								});
							}
							// console.log(Game.types[row-1], Game.types[col-1])
						}
					}
				}
			}
			// console.warn(weakstat);
			var q = 0;
			weakstat.forEach(function(m){
				/*if (m) {*/m.forEach(function(m2){
					var t1 = 1+Game.types.indexOf(m2[0]);
					var t2 = 1+Game.types.indexOf(m2[1]);
					var id = "tbl_" + t1 + "_" + t2;
					switch(Game.chartver){
						case '3':
							if (document.getElementById(id) && document.getElementById(id).innerText!='0'){
								if (!Game.availables[q]) Game.availables[q] = [];
								Game.availables[q].push(m2);
								// console.log(q, m2)
							}
							break;
						case '2':
							if (document.getElementById(id) && document.getElementById(id).innerText!='0'){
								if ((Game.title=="DPPt" 
									|| Game.title=="RSE"
									|| Game.title=="GSC"
									) 
									&&  m2 && m2[2]!="anti-grass"){
									if (!Game.availables[q]) Game.availables[q] = [];
									Game.availables[q].push(m2);
									// console.log(q, m2)
								}
								else {
									if (!Game.availables[q]) Game.availables[q] = [];
									if (Game.restriction){
										// console.log(document.getElementById("tbl_"+(1+Game.types.indexOf(m2[0]))+"_"+(1+Game.types.indexOf(m2[1]))).style.backgroundColor, m2)
										if (document.getElementById("tbl_"+(1+Game.types.indexOf(m2[0]))+"_"+(1+Game.types.indexOf(m2[1]))).style.backgroundColor!="rgb(0, 0, 0)"){
											Game.availables[q].push(m2);
											// console.log(q, m2)
										}
									} else {
										Game.availables[q].push(m2);
										// console.log(q, m2)
									}
								}
							}
							break;
						case '1':
							if (document.getElementById(id) && document.getElementById(id).innerText!='0'){
								// console.warn(id, document.getElementById(id).innerText);
								if (!Game.availables[q+1]) Game.availables[q+1] = [];
								Game.availables[q+1].push(m2);
								// console.log(q+1, m2)
							}
							break;
						case '9':
							if (document.getElementById(id) && document.getElementById(id).innerText!='0'){
								if (!Game.availables[q]) Game.availables[q] = [];
								Game.availables[q].push(m2);
								// console.log(q, m2)
							}
							break;
					}
				})
					q++;					
				// }
			})
			// getPokemonData(["pokemon","ditto"]);
		}

		function texa_ok(){
			if (Game.mon.length>0) 
				if (confirm("reset?")){
					reset(0);
				} else {					
					document.getElementById("texa").value = "";
					document.getElementById("texa").style.height = "1px";
					document.getElementById("texa").style.visibility = "hidden";
					document.getElementById("texa").style.marginTop = "-12px";
					document.getElementById("texaok").style.visibility = "hidden";
					return false;
				}

			var mon = Game.mon;
			var result;
			if (!document.getElementById("texa")) return false;

			document.getElementById("texa").focus();
			document.getElementById("texa").select();

			if (document.getElementById("texa").value==""){
				// alert("empty team")
			} else {
				result = document.getElementById("texa").value;
				// console.warn(result.split("\n"))
				
				var n = 0, o = 0, p = 0;
				var cur_ab = "", cur_mon = "";

				n = 0, o = 0;
				result.split("\n").forEach(function(m){
					if (n!=0 && n%3!=0){
						if (m.split(("Ability:"))[1]){
							cur_ab = m.split("Ability:")[1];							
						} else cur_ab = "";
					} 

					if (n==0 || n%3==0) {
						cur_mon = m.split("@")[0].toLowerCase();			
						o++;
					}

					if (n>0 && ((n-1) % 3 ==0)){
						p++;
						if (Game.numofpoke<p){
							add_right();
							// console.log("p", p);
						} 
						// console.log(n, cur_mon, cur_ab);
						// getPokemonData(["pokemon", m.split("@")[0].toLowerCase(), o]);
						getPokemonData(["pokemon", cur_mon, o, undefined, cur_ab]);
					}
					n++;
				});
			}

			document.getElementById("texa").value = "";
			document.getElementById("texa").style.height = "1px";
			document.getElementById("texa").style.visibility = "hidden";
			document.getElementById("texa").style.marginTop = "-12px";
			document.getElementById("texaok").style.visibility = "hidden";
		}

		function load(){
			document.getElementById("texa").style.height = "100px";
			document.getElementById("texa").style.width = "25%";
			document.getElementById("texa").style.visibility = "";
			document.getElementById("texa").style.marginTop = "12px";
			document.getElementById("texa").placeholder = "paste here";
			/*document.getElementById("texa").value = `arcanine@
Ability:

greninja@
Ability:

whimsicott@
Ability:

weezing@
Ability:Levitate

Raticate@
Ability:
`;*/

			document.getElementById("texaok").style.visibility = "";
			// document.getElementById("texaok").style.margin = "";
			// document.getElementById("texa").focus();
			// document.getElementById("texa").select();
			// document.execCommand("paste");
		}

		function copy(){
			var mon = Game.mon;
			// var storage = window.localStorage;
			var lastid = 0;
			// var retrieved = "";
			// var retr_arr = [];
			var target = [];
			var monarr = [];

			if (mon.length<1) {
				alert("empty team");
				return false;
			}

			/*if (storage.getItem("ptcp") != null){
				retrieved = storage.getItem("ptcp");
				if (retrieved!="" || retrieved!=null)
					retr_arr = retrieved.split("#");

				lastid = retr_arr.length;
				target = JSON.stringify(storage.getItem("ptcp"));
				// alert("empty team");
				// return false;
			} else {
				lastid = 0;
			}*/
			document.getElementById("texa").value = "";

			var q = 0;
			mon.forEach(function(m){
				// monarr[q] = "@"+(Number(q+1)) + "," + m.id + "," + document.getElementById("avail_sel_"+(Number(q+1))).value + "," + document.getElementById("imun_sel_"+(Number(q+1))).value + "," + document.getElementById("confplus_sel_"+(Number(q+1))).value;
				monarr[q] = m.name + `@` + `` + `\n` + `Ability:` + m.ability;
				monarr[q] += `\n\n`;
				q++;
			})

			target[lastid] = ["#"+lastid, Game.chartver, Game.title, Game.numofpoke, Game.restriction, monarr];

			// console.error(lastid);

			target[lastid][5].forEach(function(m){
				document.getElementById("texa").value += m;
			})

			document.getElementById("texa").style.width = "200px";
			document.getElementById("texa").style.height = "200px";
			document.getElementById("texa").style.visibility = "";

			document.getElementById("texa").focus();
			document.getElementById("texa").select();
			document.execCommand("copy");

			document.getElementById("texa").style.width = "0px";
			document.getElementById("texa").style.height = "0px";
			document.getElementById("texa").style.visibility = "hidden";

			alert("copied");
			document.body.focus();

			// storage.setItem('ptcp', target);
			// console.warn(storage.getItem("ptcp"));
		}

		function undo(){
			if (Game.mon.length>0){
				document.getElementById("del_"+Game.mon.length).click();
			}
		}
