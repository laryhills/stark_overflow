import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useContract } from "@hooks/useContract";
import { useWallet } from "@hooks/useWallet";
import { useAccount } from "@starknet-react/core";
import { CircleNotch, Warning } from "phosphor-react";
import { Button } from "./style";



export function ForumAdmin() {
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [ownershipChecked, setOwnershipChecked] = useState(false);
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { openConnectModal } = useWallet();
  const {
    createForum,
    checkIsOwner,
    forumsLoading,
    forumsError,
    contractReady,
    address
  } = useContract();

  // Fix: Create a more robust icon preview with proper dependency tracking
  const iconPreview = useMemo(() => {
    if (!iconUrl.trim()) return null

    // Add a timestamp to prevent caching issues
    const urlWithTimestamp = iconUrl.includes("?") ? `${iconUrl}&t=${Date.now()}` : `${iconUrl}?t=${Date.now()}`

    return urlWithTimestamp
  }, [iconUrl]) // This will properly update when iconUrl changes

  // Reset image states when URL changes
  useEffect(() => {
    setImageError(false)
    setImageLoaded(false)
  }, [iconUrl])

  // Check ownership when component mounts or address changes
  useEffect(() => {
    if (isConnected && address && contractReady) {
      const checkOwnership = async () => {
        const ownerResult = await checkIsOwner();
        setIsOwner(ownerResult);
        setOwnershipChecked(true);

        if (!ownerResult) {
          setError("Access denied: Only the contract owner can create forums");
        }
      };
      checkOwnership();
    } else if (!isConnected) {
      setIsOwner(false);
      setOwnershipChecked(true);
    }
  }, [isConnected, address, contractReady, checkIsOwner]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isConnected) {
      openConnectModal();
      return;
    }

    if (!isOwner) {
      setError("Access denied: Only the contract owner can create forums");
      return;
    }

    if (!name.trim()) {
      setError("Forum name is required");
      return;
    }

    if (!iconUrl.trim()) {
      setError("Icon URL is required");
      return;
    }

    if (imageError) {
      setError("Please provide a valid image URL")
      return
    }

    setIsLoading(true);

    try {
      const transactionHash = await createForum(name, iconUrl);

      if (transactionHash) {
        setSuccess(`Forum created successfully! Transaction: ${transactionHash}`);
        // Clear form
        setName("");
        setIconUrl("");

        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError("Failed to create forum. Please try again.");
      }
    } catch (error) {
      console.error("Error creating forum:", error);
      setError("Failed to create forum. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageError(false)
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  if (!ownershipChecked) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Checking permissions...</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Create Forum</h1>
        <p>Please connect your wallet to create a forum</p>
        <button
          onClick={openConnectModal}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Access Denied</h1>
        <p>Only the contract owner can create forums</p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create New Forum</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Forum Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter forum name (e.g., ReactJS, Python, etc.)"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px"
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="iconUrl" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Icon URL *
          </label>
          <input
            id="iconUrl"
            type="url"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
            placeholder="Enter icon URL (e.g., https://example.com/icon.png)"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px"
            }}
            required
          />
        </div>

        {iconPreview && (
          <div style={{ marginBottom: "20px" }}>
            <span style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Icon Preview:</span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ position: "relative" }}>
                <img
                  key={iconPreview} // Force re-render when URL changes
                  src={iconPreview || "/placeholder.svg"}
                  alt="Forum icon preview"
                  style={{ display: imageError ? "none" : "block", width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                {!imageLoaded && !imageError && (
                  <div style={{ width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f0f0f0" }}>
                    <CircleNotch size={24} />
                  </div>
                )}
                {imageError && (
                  <div style={{ width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f0f0f0" }}>
                    <Warning size={24} style={{ color: "#721c24" }} />
                  </div>
                )}
              </div>
              {imageError && <span style={{ fontSize: "13px", color: "#721c24" }}>Failed to load image</span>}
            </div>
          </div>
        )}

        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Button variant="cancel" type="button"
            onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button variant="create" type="submit" disabled={isLoading || forumsLoading}>
            {isLoading ? "Creating Forum..." : "Create Forum"}
          </Button>
        </div>
      </form>

      {error && (
        <div style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
          borderRadius: "5px"
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#d4edda",
          color: "#155724",
          border: "1px solid #c3e6cb",
          borderRadius: "5px",
          width: "100%"
        }}>
          {success}
        </div>
      )}

      {forumsError && (
        <div style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
          borderRadius: "5px"
        }}>
          Forum creation error: {forumsError}
        </div>
      )}
    </div>
  );
} 