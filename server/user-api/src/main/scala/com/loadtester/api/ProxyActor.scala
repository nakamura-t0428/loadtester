package com.loadtester.api

import com.typesafe.scalalogging.LazyLogging
import scala.concurrent.duration._
import scala.concurrent.Future
import scala.util.Success
import scala.util.Failure
import akka.io.IO
import akka.actor._
import akka.pattern.ask
import akka.util.Timeout
import spray.can.Http
import spray.can.server.Stats
import spray.util._
import spray.http._

class ProxyActor extends Actor with LazyLogging {
  
  implicit val system: ActorSystem = ActorSystem()
  implicit val timeout: Timeout = 5.second // for the actor 'asks'
  import context.dispatcher // ExecutionContext for the futures and scheduler
  import system.dispatcher // implicit execution context
  
  def receive = {
    case _: Http.Connected => sender ! Http.Register(self)
    case req:HttpRequest if req.uri.scheme == "http" => {
      logger.debug(s"Protocol: ${req.protocol},URI: ${req.uri}")
      pipelineProxy(sender, req)
    }
    case req@HttpRequest(method, uri, headers, entity, protocol) if uri.scheme == "https" => {
      logger.debug(s"Protocol: ${protocol},URI: ${uri}")
      sender ! HttpResponse(status = 500, entity = "Not Implemented HTTPS.")
    }
  }
  
  def pipelineProxy(browser:ActorRef, req:HttpRequest) = {
    import scala.concurrent.ExecutionContext.Implicits.global
    IO(Http).ask(req).mapTo[HttpResponse] onComplete {
      case Success(resp) => {
        logger.info(s"Proxy: ${resp.status} for ${req.method} ${req.uri}")
        browser ! HttpResponse(resp.status, resp.entity, resp.headers, resp.protocol)
      }
      case Failure(e) => {
        logger.error("ProxyClientError", e)
        browser ! HttpResponse(status = 500, entity = "error")
      }
    }
  }
}