import { NextRequest, NextResponse } from 'next/server';
import { saveSurveyResponse, SurveyData } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields (radio buttons)
    const requiredFields = [
      'quality', 'deliveryUnderstanding', 'deliveryOnTime', 'deliveryProfessionalism',
      'installationQuality', 'installationProfessionalism', 'customerCare', 
      'serviceTeamRating', 'overallSatisfaction', 'recommend'
    ];
    
    const missingFields = requiredFields.filter(field => !body[field] || body[field].trim() === '');
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }
    
    // Get client info
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Extract site parameter from request body
    const site = body.site || null;
    
    // Save to database
    const surveyId = await saveSurveyResponse(body as SurveyData, site, ipAddress, userAgent);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Survey response saved successfully',
        surveyId 
      },
      { status: 201 }
    );
    
  } catch (error) {
    // Log detailed error for debugging
    console.error('API Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      timestamp: new Date().toISOString()
    });
    
    // Return user-friendly error message
    return NextResponse.json(
      { 
        success: false,
        error: 'We\'re experiencing technical difficulties. Please try again later or contact support if the problem persists.' 
      },
      { status: 500 }
    );
  }
}