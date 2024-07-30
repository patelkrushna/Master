class User {
  constructor(userID, username, password, email) {
    this.userID = userID;
    this.username = username;
    this.password = password;
    this.email = email;
    this.created_at = new Date();
  }

  deleteUser() {
    console.log("User deleted successfully.");
    return true;
  }

  updateUser() {
    console.log("User updated successfully.");
    return true;
  }

  getUser() {
    return {
      userID: this.userID,
      username: this.username,
      password: this.password,
      email: this.email,
      created_at: this.created_at,
    };
  }
}

class Migration {
  constructor(
    migrationID,
    authToken,
    createdBy,
    completedAt = "",
    isActive = false,
    isComplete = false,
    status = "",
    error = "",
    skippedRecords = 0,
    mergedRecords = 0,
    addedRecords = 0,
    updatedRecords = 0
  ) {
    this.migrationID = migrationID;
    this.authToken = authToken;
    this.createdBy = createdBy;
    this.createdAt = new Date();
    this.completedAt = completedAt;
    this.isActive = isActive;
    this.isComplete = isComplete;
    this.status = status;
    this.error = error;
    this.skippedRecords = skippedRecords;
    this.mergedRecords = mergedRecords;
    this.addedRecords = addedRecords;
    this.updatedRecords = updatedRecords;
  }

  getMigration() {
    return {
      migrationID: this.migrationID,
      authToken: this.authToken,
      isActive: this.isActive,
      isComplete: this.isComplete,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      completedAt: this.completedAt,
      status: this.status,
      error: this.error,
      skippedRecords: this.skippedRecords,
      mergedRecords: this.mergedRecords,
      addedRecords: this.addedRecords,
      updatedRecords: this.updatedRecords,
    };
  }

  updateMigration() {
    console.log("Migration updated successfully.");
    return true;
  }

  deleteMigration() {
    console.log("Migration deleted successfully.");
    return true;
  }
}

class MappingMeta {
  constructor(
    mapMetaID,
    migrationID,
    moduleID,
    moduleName,
    fieldsMapping,
    fieldsMeta,
    isFetchComplete = false,
    isActive = false,
    isComplete = false,
    totalRecords = 0,
    processedRecords = 0
  ) {
    this.mapMetaID = mapMetaID;
    this.migrationID = migrationID;
    this.moduleID = moduleID;
    this.moduleName = moduleName;
    this.fieldsMapping = fieldsMapping;
    this.fieldsMeta = fieldsMeta;
    this.isFetchComplete = isFetchComplete;
    this.isActive = isActive;
    this.isComplete = isComplete;
    this.totalRecords = totalRecords;
    this.processedRecords = processedRecords;
  }

  getMappingMeta() {
    return {
      mapMetaID: this.mapMetaID,
      migrationID: this.migrationID,
      moduleID: this.moduleID,
      moduleName: this.moduleName,
      fieldsMapping: this.fieldsMapping,
      fieldsMeta: this.fieldsMeta,
      isFetchComplete: this.isFetchComplete,
      isActive: this.isActive,
      isComplete: this.isComplete,
      totalRecords: this.totalRecords,
      processedRecords: this.processedRecords,
    };
  }
}
