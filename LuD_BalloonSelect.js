//=============================================================================
// LuD_BalloonSelect.js
// v1.0.0
//=============================================================================
var Imported = Imported || {};
Imported.LuD_BalloonSelect = true;

var LuD = LuD || {};
LuD.BalloonSelect = LuD.BalloonSelect || {};

//-----------------------------------------------------------------------------
/*:
@plugindesc 말풍선 변경 플러그인
플러그인 명령에 [말풍선 FileName] 이라고 적어줍니다.
@author LuD

@help
말풍선 그래픽 파일을 바꿀 수 있게 해주는 스크립트 입니다.

말풍선 그래픽파일은 img/system 폴더에 넣어주세요.

사용법 :
플러그인 명령에

말풍선 FileName

이라고 적어주면 FileName의 그래픽파일을 사용해서 말풍선이 표시됩니다.

기본 그래픽파일 이름은 Balloon 입니다.
*/

(function() {
	LuD.parameters = PluginManager.parameters('LuD_BalloonSelect');
	LuD.BalloonSelect.pluginCommand = Game_Interpreter.prototype.pluginCommand;
	LuD.params = LuD.params || {};
	var _defaultBalloonName = 'Balloon';

	//---------------------------------------------------------------------------
	var _Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		_Game_System_initialize.call(this);
		this._balloonName = _defaultBalloonName;
	}
	//---------------------------------------------------------------------------
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		LuD.BalloonSelect.pluginCommand.call(this, command, args);
        if (command === "말풍선") {
			var _newName = String(args[0]);
			var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/img/system/');
			if (path.match(/^\/([A-Z]\:)/)) path = path.slice(1);
			if (require('fs').existsSync(decodeURIComponent(path) + _newName + '.png')) {
				$gameSystem._balloonName = _newName;
			}
		}
	}

	//---------------------------------------------------------------------------
	Sprite_Balloon.prototype.loadBitmap = function() {
		this.bitmap = ImageManager.loadSystem($gameSystem._balloonName);
		this.setFrame(0, 0, 0, 0);
	}
	//---------------------------------------------------------------------------
})();
