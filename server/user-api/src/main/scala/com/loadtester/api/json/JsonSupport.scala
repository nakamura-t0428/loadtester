package com.loadtester.api.json

import spray.json.DefaultJsonProtocol
import com.loadtester.data.dto._
import com.loadtester.api.json.response._
import com.loadtester.api.json.request._

/**
 * Json変換サポートオブジェクト
 * 
 * 利用方法は以下に詳しい
 * http://spray.io/documentation/1.1.2/spray-httpx/spray-json-support/
 */
object JsonSupport extends DefaultJsonProtocol{
  import spray.json._
  
  implicit val invitationFormatter = jsonFormat1(Invitation)
  implicit val resultMessageFormatter = jsonFormat3(ResultMessage)
  implicit val userAuthFormatter = jsonFormat2(UserAuth)
  implicit val userRegisterFormatter = jsonFormat3(UserRegister)
  implicit val userAuthResponceFormatter = jsonFormat4(UserAuthResponse)
  implicit val myInfoRespFormatter = jsonFormat3(MyInfoResp)
}
