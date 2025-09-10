-- CES Housebuilders Survey Table
-- This table stores all survey responses from the housebuilder satisfaction survey

CREATE TABLE ces_housebuilders (
    -- Primary key
    ID INT IDENTITY(1,1) PRIMARY KEY,
    
    -- Section 1: Quality (REQUIRED)
    Quality NVARCHAR(10) NOT NULL,
    QualityFeedback NVARCHAR(MAX) NULL,
    
    -- Section 2: Delivery (REQUIRED fields marked)
    DeliveryUnderstanding NVARCHAR(10) NOT NULL,  -- Required: Yes/No
    DeliveryOnTime NVARCHAR(10) NOT NULL,         -- Required: Yes/No
    DeliveryDelayComment NVARCHAR(MAX) NULL,      -- Optional: Only if DeliveryOnTime = 'no'
    DeliveryProfessionalism NVARCHAR(10) NOT NULL, -- Required: 1-3 rating
    DeliveryFeedback NVARCHAR(MAX) NULL,          -- Optional
    
    -- Section 3: Installation (REQUIRED fields marked)
    InstallationQuality NVARCHAR(10) NOT NULL,              -- Required: 1-3 rating
    InstallationFeedback NVARCHAR(MAX) NULL,                -- Optional
    InstallationProfessionalism NVARCHAR(10) NOT NULL,      -- Required: 1-3 rating
    InstallationProfessionalismFeedback NVARCHAR(MAX) NULL, -- Optional
    
    -- Section 4: Aftercare / Post-Occupation (REQUIRED fields marked)
    CustomerCare NVARCHAR(10) NOT NULL,        -- Required: 1-3 rating or N/A
    ServiceTeamRating NVARCHAR(10) NOT NULL,   -- Required: 1-3 rating
    ServiceTeamFeedback NVARCHAR(MAX) NULL,    -- Optional
    
    -- Section 5: Overall (REQUIRED fields marked)
    OverallSatisfaction NVARCHAR(10) NOT NULL, -- Required: 1-3 rating
    OverallFeedback NVARCHAR(MAX) NULL,        -- Optional
    Recommend NVARCHAR(10) NOT NULL,           -- Required: Yes/Neutral/No
    
    -- Section 6: Open Comments (ALL OPTIONAL)
    Improvements NVARCHAR(MAX) NULL,           -- Optional
    Positives NVARCHAR(MAX) NULL,              -- Optional
    
    -- Metadata fields
    Site NVARCHAR(100) NULL,               -- Site parameter from URL (e.g., 'RoundelKitchens')
    SubmittedDate DATETIME2 DEFAULT GETDATE(),
    IPAddress NVARCHAR(45) NULL,
    UserAgent NVARCHAR(500) NULL
);

-- Create indexes for better performance
CREATE INDEX IX_ces_housebuilders_SubmittedDate ON ces_housebuilders (SubmittedDate DESC);
CREATE INDEX IX_ces_housebuilders_OverallSatisfaction ON ces_housebuilders (OverallSatisfaction);
CREATE INDEX IX_ces_housebuilders_Recommend ON ces_housebuilders (Recommend);
CREATE INDEX IX_ces_housebuilders_Site ON ces_housebuilders (Site);

-- If table already exists, run this to add the Site column:
-- ALTER TABLE ces_housebuilders ADD Site NVARCHAR(100) NULL;

-- Add comments to document the table
EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Stores housebuilder satisfaction survey responses. Required fields are enforced with NOT NULL constraints.', 
    @level0type = N'SCHEMA', @level0name = N'dbo', 
    @level1type = N'TABLE', @level1name = N'ces_housebuilders';