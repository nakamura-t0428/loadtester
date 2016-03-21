package com.loadtester.data.service

import com.loadtester.data.db.ServiceDb

class SchemaService(val dbm:ServiceDb) {
  import dbm.db
  import dbm.driver.api._
  
  val schema = dbm.userTbl.schema
  
  def createTables = {
    db.run(schema.drop.asTry.andFinally(schema.create))
  }
}