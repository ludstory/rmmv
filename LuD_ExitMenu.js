//=============================================================================
// LuD_ExitMenu.js
// v1.0.0
//=============================================================================

/*:
 * @plugindesc 게임종료 메뉴 추가 플러그인 입니다.
 * @author LuD
 *
 * @param 종료 문자
 * @desc "게임 종료" 부분에 표시될 글자 입니다.
 기본값 : 게임 종료
 * @default 게임 종료
 *
 * @param 메뉴 사용
 * @desc 게임 내부의 메뉴에서 그만두기를 할 경우에도 표시할지 여부
 네 : 사용(기본값), 아니오: 사용 안함
 * @default true
 *
 * @help 게임종료 메뉴 추가 플러그인 v1.0.0 by LuD
*/

(function() {

	var parameters = PluginManager.parameters('LuD_ExitMenu');
	var _exitText = String(parameters['종료 문자'] || '게임 종료');
	var _yesAnswers = ['네','예','true','1','사용','표시'];
	var _useGameEndCommand = _yesAnswers.indexOf(String(parameters['메뉴 사용'])) !== -1;

	Scene_Base.prototype.commandExit = function() {
		this._commandWindow.close();
		this.fadeOutAll();
		SceneManager.exit();
	};

	var _Scene_Title_createCommandwindow = Scene_Title.prototype.createCommandWindow;
	Scene_Title.prototype.createCommandWindow = function() {
		_Scene_Title_createCommandwindow.call(this);
		this._commandWindow.setHandler('exit',	this.commandExit.bind(this));
	};

	var _Scene_GameEnd_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
	Scene_GameEnd.prototype.createCommandWindow = function() {
		_Scene_GameEnd_createCommandWindow.call(this);
		this._commandWindow.setHandler('exit',	this.commandExit.bind(this));
	};

	var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
	Window_TitleCommand.prototype.makeCommandList = function() {
		_Window_TitleCommand_makeCommandList.call(this);
		this.addCommand(_exitText,   'exit');
	};

	var _Window_GameEnd_makeCommandList = Window_GameEnd.prototype.makeCommandList;
	Window_GameEnd.prototype.makeCommandList = function() {
		_Window_GameEnd_makeCommandList.call(this);
		if(_useGameEndCommand) this.addCommand(_exitText,   'exit');
	};

})();
