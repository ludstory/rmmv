//=============================================================================
// LuD_ExitMenu.js
// v1.1.1
//=============================================================================
var Imported = Imported || {};
Imported.LuD_ExitMenu = true;

var LuD = LuD || {};
LuD.ExitMenu = {};

//-----------------------------------------------------------------------------
/*:
@plugindesc 게임종료 메뉴 추가 플러그인 입니다.
@author LuD

@param 종료 문자
@desc "게임 종료" 부분에 표시될 글자 입니다.
기본값 : 게임 종료
@default 게임 종료

@param 메뉴 사용
@desc 게임 내부의 메뉴에서 그만두기를 할 경우에도 표시할지 여부
네 : 사용(기본값), 아니오: 사용 안함
@default 네

@help
게임종료 메뉴 추가 플러그인 by LuD

타이틀과 게임 메뉴에 '게임 종료' 명령을 추가해 줍니다.

또한 이벤트의 플러그인 커멘드에
ExitGame
이라고 적으면 게임을 종료할 수 있습니다.

2016.1.16 - 내부 코드 수정
2016.1.14 - 내부 코드 수정
2016.01.13 - 플러그인 배포
*/

(function() {
	LuD.ExitMenu.parameters = PluginManager.parameters('LuD_ExitMenu');
	LuD.ExitMenu.pluginCommand = Game_Interpreter.prototype.pluginCommand;
	LuD.ExitMenu.params = {};

	//---------------------------------------------------------------------------
	LuD.ExitMenu.params['exitText'] = String(LuD.ExitMenu.parameters['종료 문자'] || '게임 종료');
	var _yesSign = ['네','예','true','1','사용','표시','yes','y'];
	LuD.ExitMenu.params['useGameEnd'] = _yesSign.indexOf(String(LuD.ExitMenu.parameters['메뉴 사용'] || '네').toLowerCase()) !== -1;
	//---------------------------------------------------------------------------

	Scene_Base.prototype.commandExit = function() {
		this._commandWindow.close();
		this.fadeOutAll();
		SceneManager.exit();
	};

	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		LuD.ExitMenu.pluginCommand.call(this, command, args);
        if (command.toLowerCase() === "exitgame") {
			SceneManager._scene.fadeOutAll();
			SceneManager.exit();
		};
	};

	LuD.ExitMenu.Scene_Title_createCommandwindow = Scene_Title.prototype.createCommandWindow;
	Scene_Title.prototype.createCommandWindow = function() {
		LuD.ExitMenu.Scene_Title_createCommandwindow.call(this);
		this._commandWindow.setHandler('exit', this.commandExit.bind(this));
	};

	LuD.ExitMenu.Scene_GameEnd_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
	Scene_GameEnd.prototype.createCommandWindow = function() {
		LuD.ExitMenu.Scene_GameEnd_createCommandWindow.call(this);
		if(LuD.ExitMenu.params['useGameEnd']) this._commandWindow.setHandler('exit', this.commandExit.bind(this));
	};

	LuD.ExitMenu.Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
	Window_TitleCommand.prototype.makeCommandList = function() {
		LuD.ExitMenu.Window_TitleCommand_makeCommandList.call(this);
		this.addCommand(LuD.ExitMenu.params['exitText'], 'exit');
	};

	LuD.ExitMenu.Window_GameEnd_makeCommandList = Window_GameEnd.prototype.makeCommandList;
	Window_GameEnd.prototype.makeCommandList = function() {
		LuD.ExitMenu.Window_GameEnd_makeCommandList.call(this);
		if(LuD.ExitMenu.params['useGameEnd']) this.addCommand(LuD.ExitMenu.params['exitText'], 'exit');
	};
	//---------------------------------------------------------------------------
})();
