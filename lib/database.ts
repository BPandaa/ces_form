import sql from 'mssql';

const config: sql.config = {
  server: process.env.SQL_SERVER!,
  port: Number(process.env.SQL_PORT),
  database: process.env.SQL_DATABASE!, // Replace with your actual database name
  user: process.env.SQL_USER!, // Replace with your actual username
  password: process.env.SQL_PASSWORD!, // Replace with your actual password
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

export interface SurveyData {
  quality: string;
  qualityFeedback: string;
  deliveryUnderstanding: string;
  deliveryOnTime: string;
  deliveryDelayComment: string;
  deliveryProfessionalism: string;
  deliveryFeedback: string;
  installationQuality: string;
  installationFeedback: string;
  installationProfessionalism: string;
  installationProfessionalismFeedback: string;
  customerCare: string;
  serviceTeamRating: string;
  serviceTeamFeedback: string;
  overallSatisfaction: string;
  overallFeedback: string;
  recommend: string;
  improvements: string;
  positives: string;
}

export async function saveSurveyResponse(
  surveyData: SurveyData,
  site?: string,
  ipAddress?: string,
  userAgent?: string
): Promise<number> {
  try {
    const pool = await sql.connect(config);
    
    const result = await pool.request()
      .input('Quality', sql.NVarChar(10), surveyData.quality)
      .input('QualityFeedback', sql.NVarChar(sql.MAX), surveyData.qualityFeedback || null)
      .input('DeliveryUnderstanding', sql.NVarChar(10), surveyData.deliveryUnderstanding)
      .input('DeliveryOnTime', sql.NVarChar(10), surveyData.deliveryOnTime)
      .input('DeliveryDelayComment', sql.NVarChar(sql.MAX), surveyData.deliveryDelayComment || null)
      .input('DeliveryProfessionalism', sql.NVarChar(10), surveyData.deliveryProfessionalism)
      .input('DeliveryFeedback', sql.NVarChar(sql.MAX), surveyData.deliveryFeedback || null)
      .input('InstallationQuality', sql.NVarChar(10), surveyData.installationQuality)
      .input('InstallationFeedback', sql.NVarChar(sql.MAX), surveyData.installationFeedback || null)
      .input('InstallationProfessionalism', sql.NVarChar(10), surveyData.installationProfessionalism)
      .input('InstallationProfessionalismFeedback', sql.NVarChar(sql.MAX), surveyData.installationProfessionalismFeedback || null)
      .input('CustomerCare', sql.NVarChar(10), surveyData.customerCare)
      .input('ServiceTeamRating', sql.NVarChar(10), surveyData.serviceTeamRating)
      .input('ServiceTeamFeedback', sql.NVarChar(sql.MAX), surveyData.serviceTeamFeedback || null)
      .input('OverallSatisfaction', sql.NVarChar(10), surveyData.overallSatisfaction)
      .input('OverallFeedback', sql.NVarChar(sql.MAX), surveyData.overallFeedback || null)
      .input('Recommend', sql.NVarChar(10), surveyData.recommend)
      .input('Improvements', sql.NVarChar(sql.MAX), surveyData.improvements || null)
      .input('Positives', sql.NVarChar(sql.MAX), surveyData.positives || null)
      .input('Site', sql.NVarChar(100), site || null)
      .input('IPAddress', sql.NVarChar(45), ipAddress || null)
      .input('UserAgent', sql.NVarChar(500), userAgent || null)
      .query(`
        INSERT INTO ces_housebuilders (
          Quality, QualityFeedback, DeliveryUnderstanding, DeliveryOnTime, 
          DeliveryDelayComment, DeliveryProfessionalism, DeliveryFeedback,
          InstallationQuality, InstallationFeedback, InstallationProfessionalism,
          InstallationProfessionalismFeedback, CustomerCare, ServiceTeamRating,
          ServiceTeamFeedback, OverallSatisfaction, OverallFeedback, Recommend,
          Improvements, Positives, Site, IPAddress, UserAgent
        ) 
        OUTPUT INSERTED.ID
        VALUES (
          @Quality, @QualityFeedback, @DeliveryUnderstanding, @DeliveryOnTime,
          @DeliveryDelayComment, @DeliveryProfessionalism, @DeliveryFeedback,
          @InstallationQuality, @InstallationFeedback, @InstallationProfessionalism,
          @InstallationProfessionalismFeedback, @CustomerCare, @ServiceTeamRating,
          @ServiceTeamFeedback, @OverallSatisfaction, @OverallFeedback, @Recommend,
          @Improvements, @Positives, @Site, @IPAddress, @UserAgent
        )
      `);
    
    await pool.close();
    return result.recordset[0].ID;
  } catch (error) {
    // Log detailed error for debugging
    console.error('Database error:', error);
    console.error('Database error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      timestamp: new Date().toISOString(),
      config: {
        server: config.server,
        database: config.database,
        user: config.user
      }
    });
    
    // Throw a generic error to avoid exposing database details
    throw new Error('Failed to save survey response');
  }
}