package com.loadtester.data.db

import github.nakamura_t0428.db.DbBase
import com.loadtester.data.table._

class ServiceDb(runMode:String = DbBase.envRunMode)
extends DbBase("/loadtest-db", runMode)
with UserT
with ProjectT
with ProjectUserT
